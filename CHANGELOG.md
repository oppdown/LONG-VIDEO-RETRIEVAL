# Changelog

All notable changes to LONG VIDEO RETRIEVAL are documented here.

The project follows Semantic Versioning. Dates use ISO 8601 format.

## [Unreleased]

- Added a visible radio-button task-profile list in place of the profile dropdown.
- Added local video-file selection and drag-and-drop intake for common video formats.
- Added a prompt/question editor and intake summary for test task instructions.
- Added a desktop UI contract regression test to prevent the dropdown from returning.

## [0.1.0] - 2026-08-20

- Created the public project skeleton for a Windows-first multimodal video analysis application.
- Added the Rust dense temporal analysis contract with consecutive source-frame validation, motion-change detection, and phantom-motion review flags.
- Added checked-in dense regression fixtures for real motion, no motion, motion changes, and suspicious pixel-only change.
- Added GitHub Actions CI, GitHub Pages documentation, release workflow, contribution templates, security policy, and code of conduct.
- Added a Tauri/React desktop boundary and future FFmpeg/OpenAI adapter seams.
