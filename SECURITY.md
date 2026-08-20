# Security Policy

## Supported versions

Only the latest `main` branch and the latest published release receive security fixes while the project is pre-1.0.

## Reporting a vulnerability

Please do not open a public issue for a security vulnerability. Use GitHub's private vulnerability reporting for this repository when enabled, or contact the maintainers through the repository owner account. Include a clear description, reproduction steps, impact, and a proposed mitigation if known.

Do not include API keys, private media, personal data, or credentials in a report.

## Security expectations

- API keys must be supplied through local environment or OS credential storage, never committed.
- Raw media should remain local unless the user explicitly approves a remote analysis step.
- Logs and regression fixtures must use redacted metadata.
- Model requests must expose the exact media windows and derived evidence sent remotely.

