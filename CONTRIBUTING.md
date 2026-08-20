# Contributing to LONG VIDEO RETRIEVAL

Thank you for helping build a precise, evidence-first analysis tool.

## Before opening a change

1. Read the architecture and testing documentation.
2. Keep source media, credentials, and personally identifying data out of commits.
3. For analysis behavior changes, add a small deterministic fixture and a regression test.
4. Keep modality behavior explicit: an audio-required profile must say where audio evidence enters; a video-only profile must disable audio.

## Local checks

```powershell
npm run test:fixtures
cargo fmt --all -- --check
cargo test --workspace
```

If a check requires a later-stage toolchain or media sample, document the limitation in the pull request rather than weakening the check.

## Pull requests

Describe the user-visible behavior, evidence contract, fixture coverage, and any privacy or performance implications. Prefer small, reviewable changes. Do not include real user video or audio in fixtures; use synthetic metadata or separately licensed samples.

