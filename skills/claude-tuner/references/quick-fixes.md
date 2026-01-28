# Quick Fixes

Common problems with direct CLAUDE.md solutions. Match the symptom, apply the fix.

---

## Instruction Following

| Symptom | Fix (add to CLAUDE.md) |
|---------|------------------------|
| Ignored explicit instruction | `- Always follow explicit user instructions, even if they conflict with defaults or best practices.` |
| Did opposite of what was asked | `- When user says "do X", do exactly X. Do not interpret, reframe, or improve unless asked.` |
| Skipped a step in instructions | `- Follow multi-step instructions sequentially. Do not skip or reorder steps.` |

---

## Scope & Files

| Symptom | Fix (add to CLAUDE.md) |
|---------|------------------------|
| Modified files outside task scope | `- Only modify files explicitly mentioned or directly required for the task. Ask before touching other files.` |
| Created unnecessary files | `- Do not create new files unless explicitly requested. Prefer editing existing files.` |
| Deleted or overwrote without asking | `- Always ask before deleting files or overwriting significant content.` |

---

## Confirmation & Autonomy

| Symptom | Fix (add to CLAUDE.md) |
|---------|------------------------|
| Ran commands without asking | `- Ask for confirmation before running shell commands that have side effects (install, delete, deploy, etc.).` |
| Made decisions without consulting | `- When multiple approaches exist, present options and ask which to use before proceeding.` |
| Too autonomous / didn't check in | `- Check in with the user after completing each major step before proceeding to the next.` |
| Too many questions / not autonomous enough | `- Proceed autonomously for routine tasks. Only ask when genuinely ambiguous or high-impact.` |

---

## Output Format & Style

| Symptom | Fix (add to CLAUDE.md) |
|---------|------------------------|
| Wrong language (e.g., English instead of Japanese) | `- Respond in Japanese unless explicitly asked otherwise.` |
| Too verbose | `- Keep responses concise. Avoid unnecessary explanations unless asked.` |
| Too brief / missing details | `- Provide detailed explanations including rationale and alternatives.` |
| Wrong code style | `- Follow the existing code style in this project. Do not introduce new patterns without discussion.` |
| Added unwanted comments/docstrings | `- Do not add comments or docstrings unless explicitly requested or clearly necessary.` |

---

## Testing & Validation

| Symptom | Fix (add to CLAUDE.md) |
|---------|------------------------|
| Didn't run tests | `- Always run tests after making code changes. Report results before considering task complete.` |
| Didn't verify changes work | `- Verify changes work by running the relevant command or test before marking task done.` |
| Committed without testing | `- Never commit code without first running tests and verifying they pass.` |

---

## Git & Commits

| Symptom | Fix (add to CLAUDE.md) |
|---------|------------------------|
| Commit message in wrong language | `- Write commit messages in Japanese.` |
| Commit message too short/vague | `- Write descriptive commit messages explaining what changed and why.` |
| Committed too many changes at once | `- Make small, focused commits. Each commit should represent one logical change.` |
| Pushed without asking | `- Never push to remote without explicit user approval.` |

---

## Task Execution

| Symptom | Fix (add to CLAUDE.md) |
|---------|------------------------|
| Started coding before understanding | `- Before implementing, explain your understanding of the task and get confirmation.` |
| Over-engineered solution | `- Implement the simplest solution that meets requirements. Avoid premature abstraction.` |
| Under-engineered / hacky solution | `- Write production-quality code even for small tasks. No shortcuts or TODOs left behind.` |
| Didn't use existing patterns | `- Study existing code patterns before implementing. Follow established conventions in this codebase.` |

---

## Usage Notes

1. Match the symptom as closely as possible
2. If multiple symptoms apply, add multiple rules
3. Prefer specific rules over generic ones
4. If no match found, escalate to complex fix (subagent analysis)
