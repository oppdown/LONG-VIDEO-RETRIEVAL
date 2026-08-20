# LONG VIDEO RETRIEVAL

Windows-first multimodal video analysis for precise, reviewable long-video retrieval.

LONG VIDEO RETRIEVAL is an early implementation skeleton for a desktop application that preserves source-media timing, searches long videos efficiently, and performs exact source-frame-by-source-frame inspection of candidate windows. The project is designed for future Tauri + React, Rust/FFmpeg, and OpenAI integrations without hiding the evidence used for an answer.

## Project status

This repository is pre-alpha. The dense temporal analysis contract, regression fixtures, documentation site, CI, application boundaries, and a buildable Windows test shell are in place. Media decoding, waveform extraction, transcription, model transport, and production signing remain later milestones.

## Core promise

**Original media -> timestamped evidence -> dense verification -> reasoned result.**

Candidate windows are never silently interpolated or reduced to one screenshot. Dense analysis requires consecutive source-frame records with their original frame indexes and presentation timestamps. The current Rust core records pixel-change, motion-energy, tracked-entity displacement, and motion-change signals so future FFmpeg adapters can provide real decoded measurements.

The phantom-motion signal is a review flag, not a claim of ground truth. It identifies a disagreement between pixel-level change and corroborating motion signals for human or model review.

## Supported task profiles

- Sparse Long-Video Retrieval — Audio Required
- Sparse Long-Video Retrieval — Video Only
- Temporal Ordering — How-To (Audio Required)
- Temporal Ordering — How-To (Video Only)
- Spatial State Change / Physical Outcome — Video Only

See [the task profiles](docs/task-profiles.md) and [the architecture](docs/architecture.md) for the modality boundaries and evidence flow.

## Repository map

```text
apps/desktop/             Tauri/React shell and future desktop UI
crates/dense-analysis/    source-frame comparison contract and Rust tests
docs/                     GitHub Pages documentation site
tests/fixtures/dense/     checked-in regression scenarios
.github/                  CI, Pages, release, and contribution metadata
```

## Quick start

Prerequisites:

- Windows 10 or later
- Node.js 20+
- Rust stable with the Windows MSVC target
- FFmpeg and FFprobe on `PATH` for future media adapters

Run the local checks:

```powershell
npm run test:fixtures
cargo test --workspace
```

To build the desktop shell locally after installing the desktop dependencies:

```powershell
cd apps/desktop
npm install
npm run tauri -- build
```

Public Windows `.exe` and `.msi` test packages are published from tagged GitHub releases and linked from the [documentation site](https://oppdown.github.io/LONG-VIDEO-RETRIEVAL/).

## Evidence and privacy

The application should default to local media inspection, explicit consent before remote model calls, redacted logs, and no API keys in source or fixture files. See [SECURITY.md](SECURITY.md) and [docs/testing.md](docs/testing.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), and the issue templates before opening a change. Every behavioral change to dense analysis should add or update a fixture and a regression test.

## License

LONG VIDEO RETRIEVAL is released under the MIT License. See [LICENSE](LICENSE).
