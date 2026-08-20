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

The current public test build is `v0.1.0-test.4`, built from the task-intake-controls milestone. The pre-alpha foundation includes dense analysis primitives, deterministic fixtures, CI, documentation, and the future desktop boundaries. Media decoding and remote reasoning adapters are next-stage work.

## Download a Windows test build

The current Windows installers are available on the [Windows downloads page](downloads.md) and the [v0.1.0-test.4 GitHub release](https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/releases/tag/v0.1.0-test.4). It is a testable shell, not a production analysis application: media decoding, FFmpeg integration, and OpenAI reasoning are still planned milestones. Review the release notes before installing it.

## Read next

- [Architecture](architecture.md)
- [Windows downloads](downloads.md)
- [Task profiles and modality rules](task-profiles.md)
- [Testing and regression control](testing.md)
- [Detailed changelog](changelog.md)
