---
layout: default
title: LONG VIDEO RETRIEVAL
---

# LONG VIDEO RETRIEVAL

LONG VIDEO RETRIEVAL is a Windows-first multimodal video analysis workbench for long-video retrieval, synchronized audio/video evidence, and exact dense temporal verification.

## Design principle

**Search broadly, then verify narrowly and exactly.**

Long videos are searched with sparse, timestamped evidence. Candidate windows are then re-opened at the original source frame rate and compared frame by frame. A result must retain the source frame indexes, original presentation timestamps, and evidence signals behind it.

## Current release

Version `0.1.0` is the pre-alpha foundation: dense analysis primitives, deterministic fixtures, CI, documentation, and the future desktop boundaries are established. Media decoding and remote reasoning adapters are next-stage work.

## Read next

- [Architecture](architecture.md)
- [Task profiles and modality rules](task-profiles.md)
- [Testing and regression control](testing.md)
- [Detailed changelog](changelog.md)

