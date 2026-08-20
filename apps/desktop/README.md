# Desktop shell

This directory is the Windows-first Tauri/React boundary for LONG VIDEO RETRIEVAL.

Planned responsibilities:

- drag-and-drop media intake without changing the source file;
- frame-accurate player, waveform, transcript, and candidate-window timeline;
- task profile selection with explicit audio-enabled/audio-disabled state;
- evidence review before any remote model request;
- local history and export of traceable analysis results.

The shell is intentionally static in version 0.1.0. The Rust evidence core is the first executable slice; Tauri wiring and FFmpeg bindings will arrive in later milestones.

