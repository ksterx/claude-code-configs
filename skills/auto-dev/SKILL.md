---
name: auto-dev
description: |
  Autonomous development workflow for code implementation, bug fixes, feature development,
  and refactoring. Automatically determines task complexity and adjusts workflow accordingly.
  Use when: implementing features, fixing bugs, refactoring code, or any development task.
---

# Autonomous Development Workflow

You are an autonomous development orchestrator. Analyze tasks, determine complexity, and execute the appropriate workflow with minimal human intervention.

## References (read as needed)

| Reference | When to Read |
|-----------|--------------|
| `references/task-tracking.md` | **Always read first** - Task tracking protocol |
| `references/templates/spec.md` | When generating spec.md |
| `references/templates/plan.md` | When generating plan.md |
| `references/templates/tasks.md` | When generating tasks.md |
| `references/agent-prompts.md` | When invoking agents |
| `references/handoff-schema.md` | When passing context between agents |
| `references/review-protocol.md` | When performing subagent review |
| `references/codex-review.md` | When performing Codex technical review |
| `references/stacks/typescript.md` | TypeScript/React projects (auto-detect) |

## Preflight: Stack Detection

Before complexity assessment, detect project stack and read relevant stack reference:

| Detection Criteria | Stack File |
|-------------------|-----------|
| `package.json` has `next` in dependencies + `tsconfig.json` | `references/stacks/typescript.md` (Next.js mode) |
| `package.json` has `react` (no `next`) + `tsconfig.json` or `.tsx` files | `references/stacks/typescript.md` (React-only mode) |

**Detection notes:**
- Check `dependencies` or `devDependencies` entries (not substring match)
- Also accept `tsconfig.*.json` variants
- Skip if project already has established different choices (e.g., Redux, MUI)

Apply stack conventions throughout implementation, respecting existing project choices.

---

## Phase 0: Discovery

**Before assessing complexity, understand what the user truly wants.**

The user's stated request may be based on incomplete knowledge or wrong assumptions. Your job is to uncover the real goal.

### Procedure
1. **Ask 2-4 clarifying questions** about:
   - What outcome they expect (not what they want built)
   - Why this approach (are there constraints you should know about?)
   - What existing behavior should be preserved vs. changed
   - Who/what will consume the output
2. **Challenge assumptions** if something seems off:
   - Propose better alternatives if they exist
   - "You asked for X, but Y might better solve the underlying problem because..."
3. **Produce an Intent Summary** (1-3 sentences):
   ```
   Intent: [What the user actually needs and why]
   Approach: [Chosen approach and key tradeoff]
   Out of scope: [What we are NOT doing]
   ```
   The user confirms or corrects this before proceeding. This is NOT an approval gate — it is a 5-second sanity check to prevent building the wrong thing entirely.

### Skip Discovery when:
- Task is immediately obvious (likely Trivial/Simple)
- User has already provided detailed specs or explicit requirements
- Follow-up task in an ongoing conversation where context is established

---

## Phase 1: Complexity Assessment

| Level | Criteria | SDD | Review |
|-------|----------|-----|--------|
| **Trivial** | 1-2 lines, single file, obvious | No | No |
| **Simple** | Clear, 1-3 files, existing patterns | No | Yes |
| **Standard** | New functionality, multiple files, design needed | Yes | Yes |
| **Complex** | Large scope, architectural impact, ambiguous | Yes | Yes |

**Output:**
```
Complexity: [LEVEL]
Reasoning: [Brief justification]
```

**Immediately after assessment:** Create tasks per `references/task-tracking.md`

---

## Phase 1.5: Session Startup Protocol

When resuming work on an existing project (not a fresh start):
1. `git log --oneline -20` — understand recent changes
2. `TaskList` — recover workflow state
3. Run smoke tests / lint / type-check — confirm codebase is healthy BEFORE starting new work
4. If tests fail → fix first, then proceed

Skip if this is a fresh task with no prior work.

---

## Phase 2: Task Tracking Setup (Simple+)

**Required for Simple, Standard, Complex workflows.**

1. Read `references/task-tracking.md`
2. Create all tasks for the workflow using `TaskCreate`
3. Include feature slug and complexity in task descriptions
4. Update task status as you progress through phases

**Recovery:** If context is lost (post-compacting), run `TaskList` to identify current state.

---

## Workflow by Complexity

### Trivial
```
Implement directly → Verify → Complete
```

### Simple
```
explorer(summary) → implementer → tests PASS → reviewer → auto-fix → Complete
```

### Standard (with SDD)
```
EXPLORATION
  explorer(detailed) → [Review]

SPECIFICATION
  architect(spec) → [Review] → [Codex async]
  architect(plan) → [Review] → [Codex async]
  architect(tasks) → [Review] → [Codex async]

IMPLEMENTATION
  implementer → tests PASS → [Review] → [Codex async]

REVIEW
  reviewer(spec-compliance)
  reviewer(standard) → auto-fix → Complete
```

### Complex (with SDD)
```
EXPLORATION
  explorer(scoped) x2-3 parallel → [Review each]

SPECIFICATION
  architect(spec) → [Review] → [Codex async]
  architect(plan + approach) x2-3 parallel → [Review each] → [Codex async each]
  architect(tasks) → [Review] → [Codex async]

IMPLEMENTATION
  implementer(phased) → tests PASS each phase → [Review] → [Codex async]

REVIEW
  reviewer(spec-compliance)
  reviewer(scoped) x3 parallel → auto-fix → Complete
```

**`tests PASS`** = Tests passing is a **hard prerequisite** for starting review. Do NOT launch `code-reviewer` while tests are failing. Fix tests first.

**`[Codex async]`** = Call Codex asynchronously with 30s timeout. On timeout, fall back to Claude subagent. See `references/codex-review.md`.

---

## Testing Strategy

**Choose test-first or implementation-first based on task nature.**

| Situation | Approach | Rationale |
|-----------|----------|-----------|
| **Bug fix** | Test first (TDD) | Write reproduction test → fix → test passes = proven fix |
| **Clear interface/contract** | Test first (TDD) | I/O is known → tests become the spec |
| **New feature / exploratory** | Implement first | Design not settled → can't write meaningful tests yet |
| **Refactoring** | Check existing tests → add if missing → refactor | Guarantee existing behavior is preserved |

### Prerequisite: Test infrastructure

TDD only works in projects with **functioning test infrastructure** (test runner, CI pipeline, existing test patterns). If the project lacks this:
1. Set up the test runner first
2. Add baseline tests for existing code
3. Then apply TDD approach

### Verification depth

`tests PASS` means more than unit tests when applicable:

| Project type | Minimum verification |
|-------------|---------------------|
| Backend API | Unit tests + integration tests against real DB/services |
| Frontend | Unit tests + Playwright/E2E for critical user flows |
| CLI tool | Unit tests + end-to-end command invocation |
| Library | Unit tests + type-check + example usage |

Use the project's existing test infrastructure. Do not invent a new testing approach.

### Git commit after each implementation task

Create a git commit after completing each implementation task (not at the end). This provides:
- Rollback points if a later task breaks something
- Clear history of incremental progress
- Clean state for each subsequent task

### Handoff to implementer

Before handing off, convert each task into a verifiable goal:
- "Add auth middleware" → "Write test that unauthenticated request returns 401, then implement middleware"
- "Fix pagination bug" → "Write test reproducing the off-by-one, then fix"

Include in the handoff:
- `test_approach: "tdd"` or `"post"`
- `goal: "[verifiable success criterion]"`

### Subagent prompt discipline

Give each subagent **one focused task**. Do NOT overload prompts with the full SKILL.md context. Include only:
- The specific task to perform
- Relevant file paths and constraints
- `test_approach` and `test_commands` (for implementer)
- Spec/plan summary (not the full document) when needed

---

## CRITICAL: Review Gate Rules

**You MUST NOT produce completion output (`## Summary`) until ALL of the following are satisfied:**

| Complexity | Required Before Completion |
|------------|---------------------------|
| **Trivial** | None |
| **Simple** | `code-reviewer` subagent launched → findings evaluated → valid fixes applied |
| **Standard** | Above + Codex review attempted (async, fallback to Claude subagent on timeout) |
| **Complex** | Above + parallel scoped reviews (bugs/quality/conventions) |

### What "auto-fix" means

"auto-fix" = **YOU (the orchestrator)** perform these steps:
1. Read the reviewer's findings
2. Evaluate each finding (see review-protocol.md criteria)
3. Edit the code to apply valid fixes
4. If any fixes were applied → re-run `code-reviewer` on changed files (max 2 iterations)
5. Record results: `[Fixed: description]` or `[Ignored: reason]`

### Self-check before completion

Before producing `## Summary`, verify:
- [ ] Did I launch `code-reviewer` subagent? (Simple+)
- [ ] Did I evaluate and act on findings? (Simple+)
- [ ] Did I attempt Codex review or fallback? (Standard+)
- [ ] Did I include `## Review Results` in my output?

**If any answer is NO → STOP. Go back and execute the missing step.**

---

## SDD Documents

```
specs/{feature-slug}/
├── spec.md    # What (requirements, acceptance criteria)
├── plan.md    # How (architecture, components)
└── tasks.md   # Steps (phased checklist)
```

**Naming:** `kebab-case`, English. Optional: `YYYYMMDD-feature-slug`

---

## Agent Modes Quick Reference

| Agent | Modes |
|-------|-------|
| **code-explorer** | `detailed`, `summary`, `scoped:[entry/data/cross-cutting]` |
| **code-architect** | `spec`, `plan`, `tasks`, `full`, `parallel:[minimal/clean/pragmatic]` |
| **code-implementer** | (default) |
| **code-reviewer** | `standard`, `spec-compliance`, `bugs`, `quality`, `conventions` |

For full prompts, read `references/agent-prompts.md`

---

## Review Pipeline (Standard+ only)

**Review is a blocking prerequisite — not optional, not skippable.**

### Step 1: Subagent Review (MANDATORY for Simple+)
After each agent output, YOU MUST:
1. Launch `code-reviewer` subagent with summary and appropriate mode
2. Wait for findings to return
3. Evaluate each finding per review-protocol.md criteria
4. Apply valid fixes to the code
5. If fixes were applied → re-launch `code-reviewer` on changed files (max 2 iterations)

### Step 2: Codex Technical Review (Standard+, SDD docs + post-impl, async)
After Step 1 completes on SDD documents or post-implementation code:
1. Call `mcp__codex__codex` **asynchronously** (do not block on response)
2. **Timeout: 30 seconds.** If no response → launch `code-reviewer` subagent with `quality` mode as fallback
3. If Codex responds: evaluate each finding for correctness and relevance
4. Apply validated fixes, record `[Validated: description]` or `[Rejected: reason]`

Codex is best-effort — unreliable responses are expected. The fallback ensures review always completes.
For full protocol, read `references/review-protocol.md` and `references/codex-review.md`

---

## When to Ask the User (During Development)

**Do NOT** insert approval gates at phase boundaries.

**DO ask** when:
- A design decision would **significantly change the final output's behavior**
- Multiple valid approaches exist with **materially different tradeoffs**
- Security implications need human judgment
- You discover the user's original request was based on a wrong assumption
- **Implementation is diverging from the Intent Summary** — if what you're building no longer matches the stated goal, STOP and clarify before continuing

---

## Iteration Budget

Maximum number of **review-fix cycles** (reviewer launch → evaluate → fix → re-review counts as 1 iteration).

| Complexity | Budget |
|------------|--------|
| Trivial | 0 |
| Simple | 2 |
| Standard | 6 |
| Complex | 10 |

When the budget is exhausted, proceed to completion with current state. Do not loop indefinitely.

---

## Progress Tracking

### Two-Level Tracking

1. **TodoWrite tasks** - Workflow state (survives compacting)
2. **tasks.md checkboxes** - Implementation progress (in SDD)

### TodoWrite (Primary - Compacting-Safe)

- Update `TaskUpdate(status=in_progress)` when starting a phase
- Update `TaskUpdate(status=completed)` when phase completes
- Run `TaskList` after compacting to recover context

### tasks.md (Secondary - Implementation Detail)

**Responsibility: Parent orchestrator (you)**

Subagents do NOT update tasks.md directly. After reviewer completes and auto-fix is applied:
1. YOU update tasks.md (not the subagent)
2. Mark completed task as `- [x]`
3. Proceed to next task

**Status markers:**
- `- [ ]` Pending
- `- [~]` In progress (optional, for long tasks)
- `- [x]` Complete (review passed)

**Timing:** Update immediately after each task completes, not in batch.

---

## Context Management (1M window)

With the 1M context window, aggressive compaction is rarely needed. But protect your context:

- **Use subagents for exploration** — they get their own 1M window; findings don't bloat yours
- **`/clear` between unrelated tasks** — not between phases of the same workflow
- **`/compact` with focus instructions** when needed: `/compact Focus on the auth implementation and modified file list`
- **Auto-compaction** triggers at ~83.5% (~835K tokens) — rare in typical workflows
- **If compaction loops** (thrashing): dump progress to a markdown file, `/clear`, restart with that file as context

---

## Definition of Done

- [ ] **Implementation addresses the user's stated goal** (from Intent Summary / spec User Intent)
- [ ] All requirements from spec.md implemented
- [ ] All acceptance criteria verified
- [ ] All tasks in tasks.md checked
- [ ] Lint/type-check pass
- [ ] Tests pass
- [ ] **Subagent review executed, findings addressed** (Simple+)
- [ ] **Codex review attempted or fallback executed** (Standard+)
- [ ] Spec compliance verified (Standard+)

---

## Output Format

```
## Summary
- **Task**: [Request]
- **Complexity**: [Level]
- **Feature**: [slug]
- **Documents**: specs/{slug}/ ✅
- **Files modified**: [List]
- **Tests**: [Pass/Fail]

## Review Results
- **Subagent review**: [Executed/N/A] — Applied: [N], Ignored: [N]
- **Codex review**: [Executed/N/A] — Applied: [N], Ignored: [N]
- **Review iterations**: [N]
```

**The `## Review Results` section is MANDATORY for Simple+ complexity.** The Stop hook will block completion if it is missing.
