---
layout: default
title: Changelog
---

# Detailed changelog

This changelog records public releases, the actual source changes included in each release, and the verification evidence used before publishing a test build.

## v0.1.0-test.4 — 2026-08-20

### User-facing changes

- Replaced the task-profile dropdown with an accessible radio-button list covering all five task profiles.
- Added explicit modality badges so audio-required and video-only behavior stays visible during testing.
- Added local video selection/drag-and-drop and a prompt/question editor for exact task text.
- Added a regression contract test covering the radio list, prompt field, file input, and no-dropdown requirement.

### Release verification

- Commit: `c1f8930`.
- Desktop production build passed with Vite.
- Dense fixture contract and desktop UI contract tests passed.
- GitHub Windows release workflow completed successfully in 8m 18s.
- Published installers: Windows NSIS `.exe` and Windows `.msi`.
- [Download this release](downloads.html) or inspect the [GitHub release assets](https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/releases/tag/v0.1.0-test.4).

### Scope boundary

This build prepares the selected task profile, local video file, and pasted prompt/question text for evidence intake. It does not yet decode media with FFmpeg, extract synchronized audio, perform dense frame analysis from the desktop shell, or call OpenAI.

## v0.1.0-test.3 — 2026-08-20

### Packaging changes

- Made Tauri icon generation explicit in the Windows release workflow.
- Added explicit Windows bundle icon paths so both installer targets can package the application icon.
- Verified the public Windows `.exe` and `.msi` artifacts were generated from the tag.

### Release verification

- GitHub Windows release workflow completed successfully in 7m 6s.
- The release contained the NSIS `.exe`, Windows `.msi`, and source archives.

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
