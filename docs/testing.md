---
layout: default
title: Testing
---

# Testing and regression control

## Dense contract

The dense verifier requires:

1. consecutive `source_frame_index` values;
2. strictly increasing original PTS values;
3. one comparison for every adjacent pair;
4. no interpolation, frame synthesis, or silent sparse fallback;
5. a retained classification and signal record for review.

## Checked-in fixtures

The fixtures under `tests/fixtures/dense/` cover real motion, no motion, a motion-change boundary, and a suspicious pixel-only change. They contain derived metadata only, never private media.

Run:

```powershell
npm run test:fixtures
cargo test --workspace
```

The JavaScript schema test guards the fixture contract. Rust unit tests guard dense adjacency, timestamp rejection, real-motion classification, motion-change classification, and phantom-motion review flags.

## Future media regression suite

When licensed synthetic clips are added, each clip should include a manifest with source hash, stream metadata, decoder version, expected frame count, expected PTS boundaries, and a human-reviewable event timeline. Never rely on a re-encoded clip when the test is about source timing.

