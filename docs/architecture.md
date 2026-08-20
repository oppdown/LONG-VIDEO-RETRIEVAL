---
layout: default
title: Architecture
---

# Architecture

## Evidence flow

```text
source media
    |
    v
FFprobe metadata + FFmpeg decoder (native Windows boundary)
    |
    +--> sparse retrieval index ----> candidate windows
    |                                      |
    +--> transcript / waveform ------------+
                                           v
                              dense source-frame verifier
                                           |
                                           v
                              evidence bundle + audit trail
                                           |
                                           v
                              OpenAI reasoning adapter (opt-in)
```

## Boundaries

### Desktop shell

`apps/desktop` will provide the Tauri/React user experience: file intake, frame-accurate playback, waveform and transcript alignment, task-profile controls, evidence review, and result export. The webview must not receive secrets that belong in the native layer.

### Native media adapter

The future Rust/FFmpeg adapter will inspect the original container and preserve codec timing, stream selection, rotation, variable-frame-rate presentation timestamps, and audio/video synchronization. It must produce one `SourceFrame` record per decoded source frame in a dense candidate window.

### Dense analysis core

`crates/dense-analysis` is independent of FFmpeg and model providers. It rejects skipped frame indexes and non-increasing PTS, compares every adjacent source-frame record, and emits a traceable `FrameComparison`. The current phantom-motion signal is a conservative inconsistency flag for review, not an assertion that pixels are hallucinated.

### Reasoning adapter

The future OpenAI adapter will receive a task-scoped evidence bundle, not an opaque full-video guess. It must show what time ranges, frames, transcript segments, and audio events were sent, and it must respect video-only profiles by excluding audio evidence at the source.

## Non-goals for 0.1.0

- no claim of autonomous Handshake submission or answer authorization;
- no bundled media samples from users;
- no hidden audio use for video-only tasks;
- no interpolation presented as a source frame;
- no production cloud upload by default.

