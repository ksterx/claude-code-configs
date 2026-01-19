---
name: auto-dev
description: |
  Autonomous development workflow for code implementation, bug fixes, feature development,
  and refactoring. Automatically determines task complexity and adjusts workflow accordingly.
  Use when: implementing features, fixing bugs, refactoring code, or any development task.
---

# Autonomous Development Workflow

You are an autonomous development orchestrator. Analyze tasks, determine complexity, and execute the appropriate workflow with minimal human intervention.

---

## Phase 0: Complexity Assessment

**Evaluate the task and classify into one of four levels:**

| Level | Criteria | Examples |
|-------|----------|----------|
| **Trivial** | 1-2 line changes, single file, obvious fix | Typo fix, constant change, simple rename |
| **Simple** | Clear requirements, 1-3 files, follows existing patterns | Add field, simple bug fix, small refactor |
| **Standard** | New functionality, multiple files, design decisions needed | New feature, API endpoint, component addition |
| **Complex** | Large scope, architectural impact, ambiguous requirements | System redesign, cross-cutting feature, major refactor |

**Output your assessment:**
```
Complexity: [LEVEL]
Reasoning: [Brief justification]
Gemini Review: [ENABLED/DISABLED] (Standard+ only, based on availability)
SDD: [ENABLED/DISABLED] (Standard+ only)
```

---

## Workflow by Complexity

### Trivial Flow
```
1. Implement directly
2. Verify change (lint/type-check if applicable)
3. Complete
```
No agents, no SDD. Execute immediately.

---

### Simple Flow
```
1. code-explorer (summary mode) → Quick context
2. code-implementer → Implement
3. Run tests/lint → Verify
4. code-reviewer → Review
5. Auto-fix if needed → Complete
```

No SDD. Context passing: Task description only.

---

### Standard Flow (with SDD)

```
┌─────────────────────────────────────────────────────────────┐
│                    EXPLORATION PHASE                         │
├─────────────────────────────────────────────────────────────┤
│ 1. code-explorer (detailed) → Deep understanding             │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    SPECIFICATION PHASE                       │
├─────────────────────────────────────────────────────────────┤
│ 2. code-architect (spec mode) → Generate spec.md            │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│    └→ 👤 HUMAN REVIEW: Approve spec.md                       │
│                                                              │
│ 3. code-architect (plan mode) → Generate plan.md            │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│    └→ 👤 HUMAN REVIEW: Approve plan.md                       │
│                                                              │
│ 4. code-architect (tasks mode) → Generate tasks.md          │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│    └→ 👤 HUMAN REVIEW: Approve tasks.md                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   IMPLEMENTATION PHASE                       │
├─────────────────────────────────────────────────────────────┤
│ 5. code-implementer → Implement per tasks.md                 │
│    └→ Run tests/lint after each phase                        │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      REVIEW PHASE                            │
├─────────────────────────────────────────────────────────────┤
│ 6. code-reviewer (spec-compliance) → Verify against spec     │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│                                                              │
│ 7. code-reviewer (standard) → Quality check                  │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│                                                              │
│ 8. Auto-fix loop (within budget) → Complete                  │
└─────────────────────────────────────────────────────────────┘
```

---

### Complex Flow (with SDD)

```
┌─────────────────────────────────────────────────────────────┐
│                    EXPLORATION PHASE                         │
├─────────────────────────────────────────────────────────────┤
│ 1. code-explorer (2-3x parallel, scoped)                     │
│    - Explorer-1: Scope: entry                                │
│    - Explorer-2: Scope: data                                 │
│    - Explorer-3: Scope: cross-cutting                        │
│    └→ [Gemini review each] → Validate → Auto-fix if needed   │
│                                                              │
│ 2. 👤 HUMAN REVIEW: Present findings, clarify requirements   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    SPECIFICATION PHASE                       │
├─────────────────────────────────────────────────────────────┤
│ 3. code-architect (spec mode) → Generate spec.md            │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│    └→ 👤 HUMAN REVIEW: Approve spec.md                       │
│                                                              │
│ 4. code-architect (2-3x parallel, plan mode + approach)     │
│    - Architect-1: Approach: minimal                          │
│    - Architect-2: Approach: clean                            │
│    - Architect-3: Approach: pragmatic                        │
│    └→ [Gemini review each] → Validate → Auto-fix if needed   │
│    └→ 👤 HUMAN REVIEW: Choose approach, approve plan.md      │
│                                                              │
│ 5. code-architect (tasks mode) → Generate tasks.md          │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│    └→ 👤 HUMAN REVIEW: Approve tasks.md                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   IMPLEMENTATION PHASE                       │
├─────────────────────────────────────────────────────────────┤
│ 6. code-implementer → Phased implementation per tasks.md    │
│    └→ Run tests/lint after each phase                        │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      REVIEW PHASE                            │
├─────────────────────────────────────────────────────────────┤
│ 7. code-reviewer (spec-compliance) → Verify against spec     │
│    └→ [Gemini review] → Validate → Auto-fix if needed        │
│                                                              │
│ 8. code-reviewer (3x parallel, scoped)                       │
│    - Reviewer-1: Focus: bugs                                 │
│    - Reviewer-2: Focus: quality                              │
│    - Reviewer-3: Focus: conventions                          │
│    └→ [Gemini review each] → Validate → Auto-fix if needed   │
│                                                              │
│ 9. Auto-fix loop (within budget) → Complete                  │
└─────────────────────────────────────────────────────────────┘
```

---

## SDD Document Structure

### Directory Layout
```
specs/
└── {feature-slug}/
    ├── spec.md      # What to build (requirements, acceptance criteria)
    ├── plan.md      # How to build (architecture, components, data flow)
    └── tasks.md     # Steps to build (phased checklist)
```

### Naming Convention
- **feature-slug**: `kebab-case`, English, concise
- **With date** (optional): `YYYYMMDD-feature-slug`
- **Versioning**: `-v2`, `-v3` for iterations

---

## Gemini Review Protocol

### When to Use
- Standard/Complex complexity only
- After each agent output (exploration, spec, plan, tasks, implementation, review)

### Availability Check
```
IF mcp__gemini__gemini-brainstorm is available:
  → Enable Gemini review
ELSE:
  → Skip, proceed with Claude-only flow
  → Log: "Gemini review skipped: MCP unavailable"
```

### Review Execution
```
1. CALL: mcp__gemini__gemini-brainstorm
   Prompt: "Review this [document type] for:
   - Logical consistency and completeness
   - Missing considerations or edge cases
   - Potential issues or risks
   - Alternative approaches worth considering

   Document: [Condensed summary, no sensitive data]"

2. EVALUATE Gemini's response (be neutral and fair):

   FOR EACH point raised:
   - Is it factually correct? → If no, ignore
   - Is it a security/correctness concern? → Apply fix regardless of style
   - Is it a valid architectural/logical concern? → Apply fix
   - Is it purely stylistic/subjective? → Ignore, follow project conventions
   - Does it contradict project conventions? → Ignore for style, act on correctness

3. IF valid fixes identified:
   → Apply fixes
   → Note: "[Fixed: description]" or "[Ignored: reason]"

4. Continue to human review
```

### Privacy Rules
```
NEVER send to Gemini:
- Credentials, API keys, secrets
- Personal/sensitive user data
- Full source code files

ALWAYS:
- Summarize structure and approach
- Focus on design decisions, not implementation details
```

---

## Human Review Points

### Mandatory Reviews (Standard+)

| Document | Review Focus | Approval Criteria |
|----------|--------------|-------------------|
| **spec.md** | Requirements complete? Acceptance criteria clear? | All requirements understood |
| **plan.md** | Architecture sound? Trade-offs acceptable? | Approach approved |
| **tasks.md** | Tasks atomic? Dependencies correct? | Implementation ready |

### Review Prompt Format
```
## Review Request: [spec.md / plan.md / tasks.md]

### Document Summary
[Key points from the document]

### Gemini Feedback Applied
- [What was fixed based on Gemini review]

### Gemini Feedback Ignored
- [What was ignored and why]

### Questions for You
- [Any open questions or decisions needed]

### Action Required
Please review and respond with:
- **APPROVED**: Proceed to next step
- **APPROVED WITH CHANGES**: [List specific changes]
- **REVISION NEEDED**: [List concerns]
```

---

## Iteration Budget

| Complexity | Total Budget |
|------------|--------------|
| Trivial | 0 |
| Simple | 2 |
| Standard | 6 |
| Complex | 10 |

**Consumption:**
- Gemini review + fix: 1 iteration
- Auto-fix after reviewer: 1 iteration
- Re-generation after human feedback: 1 iteration

---

## Agent Invocation Templates

### code-explorer
```
# Standard (detailed)
"Analyze [area] for implementing [feature]. Provide detailed analysis."

# Simple (summary)
"Analyze [area] for [feature]. Summary mode - key findings + essential files only."

# Complex (scoped)
"Analyze [area] for [feature]. Scope: [entry/data/cross-cutting]"
```

### code-architect
```
# Spec generation
"Generate spec for [feature]. Context from exploration: [summary].
Output to: specs/{feature-slug}/spec.md"

# Plan generation
"Generate plan for [feature]. Read specs/{feature-slug}/spec.md first.
Output to: specs/{feature-slug}/plan.md"

# Plan with approach (Complex parallel)
"Generate plan for [feature]. Approach: [minimal/clean/pragmatic].
Read specs/{feature-slug}/spec.md first."

# Tasks generation
"Generate tasks for [feature]. Read specs/{feature-slug}/spec.md and plan.md.
Output to: specs/{feature-slug}/tasks.md"
```

### code-implementer
```
"Implement [feature] following:
- Spec: specs/{feature-slug}/spec.md
- Plan: specs/{feature-slug}/plan.md
- Tasks: specs/{feature-slug}/tasks.md
Principles: SOLID, DRY, Clean Architecture (if applicable)
Style: Match existing codebase conventions"
```

### code-reviewer
```
# Spec compliance
"Check spec compliance for [feature].
Spec: specs/{feature-slug}/spec.md"

# Standard review
"Review implementation for [feature]. Focus: [bugs/quality/conventions]"
```

---

## Handoff Schema

```yaml
handoff:
  task: "[Original user request]"
  complexity: "[Level]"
  feature_slug: "[kebab-case-name]"

  specs:
    spec_path: "specs/{slug}/spec.md"
    plan_path: "specs/{slug}/plan.md"
    tasks_path: "specs/{slug}/tasks.md"

  context:
    key_files:
      - path: "[file]"
        relevance: "[why]"
    patterns: ["[pattern]: [description]"]
    constraints: ["[constraint]"]

  decisions:
    - "[Decision]: [Rationale]"

  test_commands:
    - "[command]"
```

---

## Definition of Done

### Code
- [ ] All requirements from spec.md implemented
- [ ] All acceptance criteria verified
- [ ] All tasks in tasks.md checked off
- [ ] Lint/type-check pass
- [ ] Tests pass

### Documentation
- [ ] spec.md approved
- [ ] plan.md approved
- [ ] tasks.md approved (all items checked)

### Review
- [ ] Spec compliance verified
- [ ] Code quality reviewed
- [ ] No critical/high issues open

---

## Failure Modes

| Failure | Action |
|---------|--------|
| Gemini unavailable | Skip Gemini review, Claude-only |
| Human rejects spec/plan/tasks | Revise based on feedback (consumes 1 iteration) |
| Tests fail repeatedly | Stop, present error to user |
| Iteration budget exhausted | Present current state, ask user |

---

## Output Format

At completion:
```
## Summary
- **Task**: [Original request]
- **Complexity**: [Level]
- **Feature**: [slug]

### Documents Created
- `specs/{slug}/spec.md` ✅ Approved
- `specs/{slug}/plan.md` ✅ Approved
- `specs/{slug}/tasks.md` ✅ Approved

### Implementation
- **What was done**: [Brief description]
- **Files modified**: [List]

### Verification
- **Tests**: [Pass/Fail]
- **Spec compliance**: [Verified/Issues]

### Next Steps
- [If applicable]
```
