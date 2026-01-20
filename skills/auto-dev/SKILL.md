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
| `references/templates/spec.md` | When generating spec.md |
| `references/templates/plan.md` | When generating plan.md |
| `references/templates/tasks.md` | When generating tasks.md |
| `references/agent-prompts.md` | When invoking agents |
| `references/handoff-schema.md` | When passing context between agents |
| `references/gemini-review.md` | When performing Gemini review |
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

## Phase 0: Complexity Assessment

| Level | Criteria | SDD | Gemini |
|-------|----------|-----|--------|
| **Trivial** | 1-2 lines, single file, obvious | No | No |
| **Simple** | Clear, 1-3 files, existing patterns | No | No |
| **Standard** | New functionality, multiple files, design needed | Yes | Yes |
| **Complex** | Large scope, architectural impact, ambiguous | Yes | Yes |

**Output:**
```
Complexity: [LEVEL]
Reasoning: [Brief justification]
```

---

## Workflow by Complexity

### Trivial
```
Implement directly → Verify → Complete
```

### Simple
```
explorer(summary) → implementer → tests → reviewer → auto-fix → Complete
```

### Standard (with SDD)
```
EXPLORATION
  explorer(detailed) → [Gemini] → validate

SPECIFICATION
  architect(spec) → [Gemini] → 👤 APPROVE
  architect(plan) → [Gemini] → 👤 APPROVE
  architect(tasks) → [Gemini] → 👤 APPROVE

IMPLEMENTATION
  implementer → tests → [Gemini] → validate

REVIEW
  reviewer(spec-compliance) → [Gemini]
  reviewer(standard) → [Gemini] → auto-fix → Complete
```

### Complex (with SDD)
```
EXPLORATION
  explorer(scoped) x2-3 parallel → [Gemini each]
  👤 REVIEW: clarify requirements

SPECIFICATION
  architect(spec) → [Gemini] → 👤 APPROVE
  architect(plan + approach) x2-3 parallel → [Gemini each] → 👤 CHOOSE & APPROVE
  architect(tasks) → [Gemini] → 👤 APPROVE

IMPLEMENTATION
  implementer(phased) → tests each phase → [Gemini]

REVIEW
  reviewer(spec-compliance) → [Gemini]
  reviewer(scoped) x3 parallel → [Gemini each] → auto-fix → Complete
```

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

## Gemini Review (Standard+ only)

After each agent output:
1. Call `mcp__gemini__gemini-brainstorm` with summary
2. Evaluate response neutrally and fairly
3. Apply valid fixes, ignore subjective/style-only feedback
4. Present to human with applied/ignored notes

For full protocol, read `references/gemini-review.md`

---

## Human Review Points (Standard+)

| Document | Approval Criteria |
|----------|-------------------|
| spec.md | Requirements complete, AC clear |
| plan.md | Architecture sound, approach approved |
| tasks.md | Tasks atomic, dependencies correct |

---

## Iteration Budget

| Complexity | Budget |
|------------|--------|
| Trivial | 0 |
| Simple | 2 |
| Standard | 6 |
| Complex | 10 |

---

## Definition of Done

- [ ] All requirements from spec.md implemented
- [ ] All acceptance criteria verified
- [ ] All tasks in tasks.md checked
- [ ] Lint/type-check pass
- [ ] Tests pass
- [ ] Spec compliance verified

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
```
