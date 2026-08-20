//! Deterministic evidence primitives for candidate-window verification.
//!
//! The decoder adapter is intentionally outside this crate. It must provide one
//! [`SourceFrame`] per decoded source frame, preserving source index and PTS.
//! This crate then compares adjacent records without interpolation or skipped
//! sampling.

/// A decoded source-frame measurement supplied by an FFmpeg adapter.
#[derive(Debug, Clone, PartialEq)]
pub struct SourceFrame {
    /// Zero-based index in the decoded source stream.
    pub source_frame_index: u64,
    /// Original presentation timestamp in microseconds.
    pub pts_us: i64,
    /// Stable digest of the decoded pixels, calculated by the adapter.
    pub pixel_digest: String,
    /// Normalized pixel motion energy between this frame and the preceding frame.
    pub motion_energy: f32,
    /// Fraction of pixels whose decoded values changed from the preceding frame.
    pub changed_pixel_ratio: f32,
    /// Aggregate displacement of tracked entities, normalized to the frame diagonal.
    pub entity_displacement: f32,
    /// A normalized signal describing a newly appearing or disappearing motion cue.
    pub motion_change: f32,
}

/// Policy thresholds for dense comparisons.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct DenseAnalysisConfig {
    pub motion_energy_threshold: f32,
    pub changed_pixel_ratio_threshold: f32,
    pub entity_displacement_threshold: f32,
    pub phantom_pixel_ratio_max: f32,
    pub phantom_motion_energy_max: f32,
}

impl Default for DenseAnalysisConfig {
    fn default() -> Self {
        Self {
            motion_energy_threshold: 0.02,
            changed_pixel_ratio_threshold: 0.001,
            entity_displacement_threshold: 0.002,
            phantom_pixel_ratio_max: 0.02,
            phantom_motion_energy_max: 0.001,
        }
    }
}

/// The evidence classification for one adjacent source-frame pair.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MotionClassification {
    NoChange,
    RealMotion,
    MotionChange,
    SuspiciousPixelOnlyChange,
}

/// A comparison that remains traceable to the exact source frames.
#[derive(Debug, Clone, PartialEq)]
pub struct FrameComparison {
    pub from_source_frame_index: u64,
    pub to_source_frame_index: u64,
    pub from_pts_us: i64,
    pub to_pts_us: i64,
    pub pixel_digest_changed: bool,
    pub changed_pixel_ratio: f32,
    pub motion_energy: f32,
    pub entity_displacement: f32,
    pub motion_change: f32,
    pub phantom_motion_suspected: bool,
    pub classification: MotionClassification,
}

/// Dense-window output, including all adjacent comparisons in source order.
#[derive(Debug, Clone, PartialEq)]
pub struct DenseAnalysisResult {
    pub source_frame_count: usize,
    pub comparisons: Vec<FrameComparison>,
}

/// Compare every consecutive source-frame record in a candidate window.
///
/// A non-consecutive frame index or non-increasing PTS is rejected. This is a
/// deliberate guard against accidentally feeding a sparse or interpolated
/// sequence into the dense verifier.
pub fn analyze_dense_window(
    frames: &[SourceFrame],
    config: DenseAnalysisConfig,
) -> Result<DenseAnalysisResult, String> {
    for pair in frames.windows(2) {
        let [from, to] = pair else { unreachable!() };
        if to.source_frame_index != from.source_frame_index + 1 {
            return Err(format!(
                "dense window skipped source frame: {} -> {}",
                from.source_frame_index, to.source_frame_index
            ));
        }
        if to.pts_us <= from.pts_us {
            return Err(format!(
                "dense window PTS is not increasing: {} -> {}",
                from.pts_us, to.pts_us
            ));
        }
    }

    let comparisons = frames
        .windows(2)
        .map(|pair| compare_pair(&pair[0], &pair[1], config))
        .collect();

    Ok(DenseAnalysisResult {
        source_frame_count: frames.len(),
        comparisons,
    })
}

fn compare_pair(
    from: &SourceFrame,
    to: &SourceFrame,
    config: DenseAnalysisConfig,
) -> FrameComparison {
    let pixel_digest_changed = from.pixel_digest != to.pixel_digest;
    let pixel_change = to.changed_pixel_ratio >= config.changed_pixel_ratio_threshold;
    let corroborated_motion = to.motion_energy >= config.motion_energy_threshold
        || to.entity_displacement >= config.entity_displacement_threshold;
    let motion_change = to.motion_change >= config.motion_energy_threshold;
    let phantom_motion_suspected = pixel_digest_changed
        && to.changed_pixel_ratio <= config.phantom_pixel_ratio_max
        && to.motion_energy <= config.phantom_motion_energy_max
        && to.entity_displacement < config.entity_displacement_threshold;

    let classification = if phantom_motion_suspected {
        MotionClassification::SuspiciousPixelOnlyChange
    } else if motion_change {
        MotionClassification::MotionChange
    } else if pixel_change && corroborated_motion {
        MotionClassification::RealMotion
    } else {
        MotionClassification::NoChange
    };

    FrameComparison {
        from_source_frame_index: from.source_frame_index,
        to_source_frame_index: to.source_frame_index,
        from_pts_us: from.pts_us,
        to_pts_us: to.pts_us,
        pixel_digest_changed,
        changed_pixel_ratio: to.changed_pixel_ratio,
        motion_energy: to.motion_energy,
        entity_displacement: to.entity_displacement,
        motion_change: to.motion_change,
        phantom_motion_suspected,
        classification,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn frame(
        index: u64,
        pts_us: i64,
        digest: &str,
        pixels: f32,
        energy: f32,
        displacement: f32,
        change: f32,
    ) -> SourceFrame {
        SourceFrame {
            source_frame_index: index,
            pts_us,
            pixel_digest: digest.to_owned(),
            motion_energy: energy,
            changed_pixel_ratio: pixels,
            entity_displacement: displacement,
            motion_change: change,
        }
    }

    #[test]
    fn compares_each_adjacent_source_frame_without_skipping() {
        let frames = vec![
            frame(10, 1_000, "a", 0.0, 0.0, 0.0, 0.0),
            frame(11, 1_033, "b", 0.4, 0.8, 0.2, 0.0),
            frame(12, 1_066, "c", 0.4, 0.8, 0.2, 0.0),
        ];
        let result = analyze_dense_window(&frames, DenseAnalysisConfig::default()).unwrap();
        assert_eq!(result.source_frame_count, 3);
        assert_eq!(result.comparisons.len(), 2);
        assert_eq!(result.comparisons[0].from_source_frame_index, 10);
        assert_eq!(result.comparisons[0].to_source_frame_index, 11);
        assert_eq!(result.comparisons[1].to_pts_us, 1_066);
        assert!(result
            .comparisons
            .iter()
            .all(|c| c.classification == MotionClassification::RealMotion));
    }

    #[test]
    fn flags_pixel_only_change_as_suspicious_phantom_motion() {
        let frames = vec![
            frame(0, 0, "stable", 0.0, 0.0, 0.0, 0.0),
            frame(1, 33_333, "one-pixel-drift", 0.005, 0.0001, 0.0, 0.0),
        ];
        let result = analyze_dense_window(&frames, DenseAnalysisConfig::default()).unwrap();
        let comparison = &result.comparisons[0];
        assert!(comparison.phantom_motion_suspected);
        assert_eq!(
            comparison.classification,
            MotionClassification::SuspiciousPixelOnlyChange
        );
    }

    #[test]
    fn reports_a_motion_change_even_when_the_scene_remains_present() {
        let frames = vec![
            frame(20, 2_000, "a", 0.0, 0.0, 0.0, 0.0),
            frame(21, 2_033, "b", 0.25, 0.2, 0.03, 0.3),
        ];
        let result = analyze_dense_window(&frames, DenseAnalysisConfig::default()).unwrap();
        assert_eq!(
            result.comparisons[0].classification,
            MotionClassification::MotionChange
        );
    }

    #[test]
    fn rejects_a_sparse_or_interpolated_sequence() {
        let frames = vec![
            frame(0, 0, "a", 0.0, 0.0, 0.0, 0.0),
            frame(2, 66_666, "c", 0.4, 0.8, 0.2, 0.0),
        ];
        let error = analyze_dense_window(&frames, DenseAnalysisConfig::default()).unwrap_err();
        assert!(error.contains("skipped source frame"));
    }

    #[test]
    fn rejects_non_increasing_timestamps() {
        let frames = vec![
            frame(0, 100, "a", 0.0, 0.0, 0.0, 0.0),
            frame(1, 100, "b", 0.4, 0.8, 0.2, 0.0),
        ];
        let error = analyze_dense_window(&frames, DenseAnalysisConfig::default()).unwrap_err();
        assert!(error.contains("PTS is not increasing"));
    }
}
