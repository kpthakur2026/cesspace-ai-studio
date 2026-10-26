# Foundation Audit — 27 Oct 2026

Status: initial documentation review only; source execution/security audit remains PENDING.

| Upstream | Role | Declared license | Main concern |
| --- | --- | --- | --- |
| https://github.com/onlook-dev/onlook | Visual-first builder UI | Apache-2.0 | Supabase, CodeSandbox SDK, Freestyle hosted dependencies |
| https://github.com/tastyeffectco/sandboxd | Sandbox/preview runtime | MIT | beta 0.x, container isolation, API auth disabled by default |
| https://github.com/anomalyco/opencode | Coding agent | MIT | model/tool integration, secrets safety, tenant scoping |

Do not combine full upstream trees blindly. Pin exact revisions, inspect license/dependencies and test the integrated architecture before vendor import. Third-party copyright notices must be preserved even if CesSpace root has no LICENSE file.

Acceptance evidence to collect:
- pinned upstream SHA, provenance, SBOM, dependency licenses and vulnerability scan;
- reproducible build, preview and patch/edit tests;
- SSO integration via qualified CES Foundation interfaces;
- adversarial tenant separation in files, Git, sandboxes, previews and billing;
- DeepSeek Harness adapter, bounded agent tools and generation-cost benchmark;
- sandbox hardened for untrusted code, no host Docker socket/credential exposure.

DECISION: conditional evaluation only. Not released, merged as implementation, deployed, or production approved.
