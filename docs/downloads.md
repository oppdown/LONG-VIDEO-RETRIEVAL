---
layout: default
title: Downloads
---

# Windows downloads

## Current public test build: v0.1.0-test.4

These are the direct, verified Windows installer links for the current public prerelease:

<a class="download-button" href="https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/releases/download/v0.1.0-test.4/LONG.VIDEO.RETRIEVAL_0.1.0_x64-setup.exe">Download the Windows .exe</a>
<a class="download-button" href="https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/releases/download/v0.1.0-test.4/LONG.VIDEO.RETRIEVAL_0.1.0_x64_en-US.msi">Download the Windows .msi</a>

| Package | SHA-256 | Size |
| --- | --- | ---: |
| [NSIS `.exe`](https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/releases/download/v0.1.0-test.4/LONG.VIDEO.RETRIEVAL_0.1.0_x64-setup.exe) | `29c045ec91891643656bf328d38579c53600ffd62c70c34d74cf04050f8448a3` | 3.36 MB |
| [Windows `.msi`](https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/releases/download/v0.1.0-test.4/LONG.VIDEO.RETRIEVAL_0.1.0_x64_en-US.msi) | `892ddcc89e5f39f980698f2b801d00e929eff5e4862019b0a8e03f4403c5461d` | 4.36 MB |

The matching [GitHub release page](https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/releases/tag/v0.1.0-test.4) contains the same assets, checksums, and source archives.

### Release verification

- Commit: `c1f8930` — `feat: add testable task intake controls`
- Windows release workflow: [successful run #4](https://github.com/oppdown/LONG-VIDEO-RETRIEVAL/actions/runs/32419487792)
- Local verification: Vite production build, dense fixture contract, and desktop UI contract tests passed.
- Build scope: pre-alpha Tauri/React shell with task intake controls.

The Windows package is currently a test shell for the planned Tauri/React application. It does not yet decode video, inspect audio, or call OpenAI. Those capabilities will be added behind the evidence and task-profile boundaries already present in the repository.

## Package choices

- `.msi`: Windows Installer package.
- `.exe`: NSIS installer package.

Only install builds published by the `oppdown/LONG-VIDEO-RETRIEVAL` repository. Test releases may be unsigned until Windows signing is added.
