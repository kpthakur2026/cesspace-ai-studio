# Stage 1 — engineering qualification (2026-10-28)

STATUS: PARTIAL — NOT COMPLETE.

## Verified
- Public repo references four pinned Git submodules: DeepSeek Harness, Onlook, OpenCode, sandboxd.
- GitHub upstream metadata shows MIT for DeepSeek Harness/OpenCode/sandboxd; Apache-2.0 for Onlook. Their upstream copyright/license terms continue to apply.
- Local Node prototype includes a fail-closed DeepSeek API adapter, explicit offline demo and API tests.
- Current Mumbai VM environment did not expose DEEPSEEK_API_KEY. Do not represent mock or offline output as live inference.

## Remaining stage 1 gates
1. Source-level four-upstream compatibility/build audit, SBOM, licensing/dependencies and vulnerability scan.
2. Real DeepSeek API inference using secure server-side secret custody (never store credentials in Git).
3. Integrated Onlook editor + single coding agent + sandboxd preview, not a disconnected toy prototype.
4. End-to-end follow-up editing, real rendered preview and benchmark evidence.
5. No public exposure without authenticated multi-tenant security and isolated generated-code execution.

## Critical security caveat
prototype/server.mjs is a developer-only scaffold, NOT production safe. Untrusted model HTML is passed through to preview and requires strict sandbox/CSP/sanitization in the eventual production solution. Do not expose this service on public network. CES Central SSO, tenant isolation, billing, publishing and production launch are not implemented.
