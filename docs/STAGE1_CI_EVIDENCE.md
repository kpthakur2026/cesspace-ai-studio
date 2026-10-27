# Stage 1 hosted CI evidence (2026-10-28)

- Commit: 189d36a79de48ef703d37d79bfcdde4d5c30c59e
- GitHub workflow: .github/workflows/stage1-ci.yml
- Run: https://github.com/kpthakur2026/cesspace-ai-studio/actions/runs/40571348964
- Result: success (checkout, Node 24 setup, syntax, prototype unit tests).
- This run does **not** test actual DeepSeek inference, upstream dependency builds, integration of Onlook + OpenCode + sandboxd + DeepSeek Harness, tenant isolation, or production readiness.
- Required Stage 1 completion: secure DeepSeek credential + live prompt-to-preview; audited upstream build and license/dependency SBOM; integrated editor/agent/preview with follow-up change test; sandbox security review.
- Never put DeepSeek credentials in git, workflow logs, public repository secrets output, or pull requests.
