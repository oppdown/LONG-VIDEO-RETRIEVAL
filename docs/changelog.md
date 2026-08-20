---
layout: default
title: Changelog
---

# Detailed changelog

## Unreleased — task intake controls

- Replaced the task-profile dropdown with an accessible radio-button list covering all five task profiles.
- Added explicit modality badges so audio-required and video-only behavior stays visible during testing.
- Added local video selection/drag-and-drop and a prompt/question editor for exact task text.
- Added a regression contract test covering the radio list, prompt field, file input, and no-dropdown requirement.

## 0.1.0 — 2026-08-20

The first public foundation of LONG VIDEO RETRIEVAL is now available.

### Analysis core

- Added a Rust workspace with `lvr-dense-analysis`.
- Added exact adjacent source-frame comparison using original source indexes and PTS.
- Added hard failures for skipped frames and non-increasing timestamps.
- Added real-motion, no-change, motion-change, and suspicious pixel-only classifications.
- Added explicit phantom-motion review flags with documentation that they are heuristics, not ground truth.

### Regression control

- Added four deterministic dense fixtures.
- Added Node fixture-schema tests and Rust unit tests.
- Added CI checks for fixture integrity, Rust formatting, Clippy, and workspace tests.

### Product foundation

- Added the Windows-first Tauri/React shell boundary.
- Added task profiles that explicitly enforce audio-required versus video-only behavior.
- Added architecture, testing, security, contribution, and release documentation.

### Next milestones

- native FFprobe/FFmpeg metadata and frame adapters;
- frame-accurate player and waveform UI;
- local transcript/audio-event extraction;
- opt-in OpenAI evidence-bundle adapter;
- signed Windows packaging and licensed media regression clips.
