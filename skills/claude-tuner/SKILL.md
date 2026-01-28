---
name: claude-tuner
description: |
  Diagnose and fix Claude Code behavior mismatches. Use when Claude didn't follow
  instructions or behaved unexpectedly. Analyzes the issue and tunes configuration
  in ~/.claude/ or project .claude/ (CLAUDE.md, rules, hooks, skills).
---

# Claude Tuner

Tune Claude Code behavior with minimal, reversible config changes.

## References (read as needed)

| Reference | When to Read |
|-----------|--------------|
| `references/quick-fixes.md` | Always read first - common problems and solutions |
| `references/advanced-fixes.md` | When quick-fixes don't cover the issue |
| `references/subagent-prompts.md` | When launching subagents for complex analysis |

---

## Phase 0: Parse Complaint

Extract from user input:
- **Expected**: What the user wanted
- **Actual**: What Claude did instead
- **Context**: Any example prompt/response (optional)

If unclear, use AskUserQuestion:
```
questions:
  - question: "What did you expect Claude to do?"
    header: "Expected"
    options:
      - label: "Follow specific instruction"
        description: "Claude ignored an explicit instruction"
      - label: "Ask before acting"
        description: "Claude acted without confirmation"
      - label: "Stay within scope"
        description: "Claude modified files outside the task"
      - label: "Use specific format/style"
        description: "Output format or language was wrong"
```

---

## Phase 1: Complexity Assessment

Read `references/quick-fixes.md` and check if the problem matches a known pattern.

| Complexity | Criteria | Action |
|------------|----------|--------|
| **Simple** | Matches quick-fix pattern | Direct CLAUDE.md edit, no subagent |
| **Complex** | No match, or requires rules/hooks/skills | Launch subagents |

---

## Phase 2A: Simple Fix (No Subagent)

1. Identify the fix from quick-fixes.md
2. Determine scope:
   - **Project-local** (default): `.claude/CLAUDE.md`
   - **Global**: `~/.claude/CLAUDE.md` (only if cross-project issue)
3. Propose the exact line(s) to add
4. Ask for approval
5. Apply using auto-managed section:

```markdown
<!-- BEGIN: TUNE AUTO-RULES -->
[new rules here]
<!-- END: TUNE AUTO-RULES -->
```

6. Record to history (append to `~/.claude/skills/claude-tuner/history.jsonl`)
7. Provide verification prompt

---

## Phase 2B: Complex Fix (With Subagents)

Launch 2 subagents sequentially using Task tool:

### Subagent 1: analyzer
```
Read references/subagent-prompts.md for the analyzer prompt.
Input: complaint summary, existing config files
Output: diagnosis + recommended config surfaces
```

### Subagent 2: designer
```
Read references/subagent-prompts.md for the designer prompt.
Input: analyzer output
Output: 1-3 change options with exact edits
```

Then:
1. Present options to user
2. Ask for approval
3. Apply chosen option
4. Record to history
5. Provide verification prompt

---

## Phase 3: Record History

Append to `~/.claude/skills/claude-tuner/history.jsonl`:

```json
{"date": "YYYY-MM-DD", "expected": "...", "actual": "...", "fix": "...", "scope": "project|global", "files": ["..."]}
```

If the same issue appears 3+ times in history, suggest a stronger fix (hook or dedicated skill).

---

## Output Format

```
## Diagnosis
- Problem: [1 sentence]
- Root cause: [1 sentence]
- Complexity: Simple | Complex

## Proposed Fix
- Scope: [project-local | global]
- File: [path]
- Change:
  ```
  [exact content to add/modify]
  ```

## Verification
Run this to test: "[example prompt to verify the fix works]"
```

---

## Constraints

- Prefer project-local changes over global
- Prefer CLAUDE.md additions over new files
- Keep changes minimal and reversible
- Always ask approval before editing
- Use auto-managed sections for traceability
