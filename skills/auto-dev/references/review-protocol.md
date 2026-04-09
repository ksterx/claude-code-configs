# Review Protocol

## Gate Condition

**Review is a blocking prerequisite for completion.** You MUST NOT:
- Produce completion output (`## Summary`) before review is done
- Skip review because the implementation "looks fine"
- Mark review tasks as completed without actually launching the reviewer

If you are about to complete and realize review has not run → **STOP and execute it now.**

---

## Overview

Two-stage review pipeline for Standard+ complexity:

| Stage | Tool | Scope | Validator |
|-------|------|-------|-----------|
| **1. Subagent Review** | `code-reviewer` subagent | Bugs, quality, conventions, spec-compliance | Claude evaluates |
| **2. Codex Technical Review** | `mcp__codex__codex` | Tech debt, dev principles, concerns, spec violations | **Claude validates** |

Stage 2 applies to **SDD documents and post-implementation code only** (not exploration).

---

## Stage 1: Subagent Review

### When to Use
- Simple+ complexity (Simple: after implementation only; Standard/Complex: after each agent output)
- After agent output (exploration, spec, plan, tasks, implementation)

### Execution

```
1. LAUNCH: code-reviewer subagent via Agent tool
   Mode: Choose based on context:
   - `standard` — General review after implementation
   - `spec-compliance` — Verify implementation matches spec
   - `bugs` / `quality` / `conventions` — Scoped review for Complex workflows

   Prompt should include:
   - Document type and summary
   - The User Intent section from spec.md (if available)
   - Review focus areas:
     - **Intent alignment**: Does the output serve the user's stated goal?
     - Logical consistency and completeness
     - Missing considerations or edge cases
     - Potential issues or risks

2. EVALUATE findings (be neutral and fair):

   FOR EACH finding:
   - Is it factually correct? → If no, ignore
   - Is it a security/correctness concern? → Apply fix
   - Is it a valid architectural/logical concern? → Apply fix
   - Is it purely stylistic/subjective? → Ignore, follow project conventions

3. Apply valid fixes, note "[Fixed: description]" or "[Ignored: reason]"
```

---

## Stage 2: Codex Technical Review

See `codex-review.md` for full protocol.

Applies after Stage 1 on:
- SDD documents (spec.md, plan.md, tasks.md)
- Post-implementation code (after tests pass)

---

## Behavior-Change Question Format

When a design decision would significantly change the final output's behavior, ask the user:

```
## Design Decision: [Brief topic]

### Context
[What you found and why this decision matters]

### Options
1. [Option A] — [tradeoff]
2. [Option B] — [tradeoff]

### Recommendation
[Your recommendation and why]
```

Do NOT use this for routine phase transitions. Only when the output behavior materially changes.
