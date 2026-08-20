---
layout: default
title: Task profiles
---

# Task profiles

Task profiles make modality and evidence requirements explicit.

| Profile | Retrieval | Dense verification | Audio |
| --- | --- | --- | --- |
| Sparse Long-Video Retrieval — Audio Required | sparse visual + transcript/audio cues | candidate window at source rate | required |
| Sparse Long-Video Retrieval — Video Only | sparse visual cues | candidate window at source rate | disabled |
| Temporal Ordering — How-To (Audio Required) | action/utterance candidates | source-frame event ordering | required as supporting evidence |
| Temporal Ordering — How-To (Video Only) | visual action candidates | source-frame event ordering | disabled |
| Spatial State Change / Physical Outcome — Video Only | object/state candidates | pre/during/post source-frame comparison | disabled |

Audio can support an audio-required task, but speech about an intended action is not proof that the action occurred. Dense visual evidence remains the source of truth for physical state changes.

