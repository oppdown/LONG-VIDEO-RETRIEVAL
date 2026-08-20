# Desktop shell

This directory is the Windows-first Tauri/React boundary for LONG VIDEO RETRIEVAL.

Planned responsibilities:

- drag-and-drop media intake without changing the source file;
- frame-accurate player, waveform, transcript, and candidate-window timeline;
- task profile selection with explicit audio-enabled/audio-disabled state;
- evidence review before any remote model request;
- local history and export of traceable analysis results.

## Current testable intake surface

The pre-alpha shell now includes:

- a visible radio-button list for all five task profiles;
- explicit `Audio required` and `Video only` modality badges;
- local video-file selection and drag-and-drop intake for common formats;
- a prompt/question editor for pasting exact task wording, answer choices, or instructions;
- an intake summary showing the selected profile and media filename before analysis.

These controls prepare the evidence-review request but do not decode media or call OpenAI yet. The next integration milestone connects the selected profile, prompt text, and source media to FFprobe/FFmpeg metadata and frame extraction.

The analysis pipeline is intentionally pre-alpha in version 0.1.0. The Rust evidence core is the first executable slice; Tauri wiring and FFmpeg bindings will arrive in later milestones.
