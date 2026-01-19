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
```

---

## Workflow by Complexity

### Trivial Flow
```
1. Implement directly
2. Verify change (lint/type-check if applicable)
3. Complete
```
No agents needed. Execute immediately.

---

### Simple Flow
```
1. code-explorer (1x) → Understand context
2. code-implementer → Implement
3. Run tests/lint → Verify
4. code-reviewer (1x) → Review
5. Auto-fix if needed → Complete
```

**Context passing:** Task description only. Agents gather their own context.

---

### Standard Flow
```
1. code-explorer (1-2x) → Deep understanding
   └→ [Gemini review if enabled] → Validate → Auto-fix if needed

2. code-architect (1x) → Design solution
   └→ [Gemini review if enabled] → Validate → Auto-fix if needed

3. 👤 USER CONFIRMATION: Present design, get approval

4. code-implementer → Implement approved design
   └→ Run tests/lint → Verify

5. code-reviewer (1-2x) → Quality check
   └→ [Gemini review if enabled] → Validate → Auto-fix if needed

6. Auto-fix loop (within budget) → Complete
```

**Context passing:** Task + light summary (use Handoff Schema below).

---

### Complex Flow
```
1. code-explorer (2-3x parallel, scoped) → Comprehensive analysis
   └→ [Gemini review each if enabled] → Validate → Auto-fix if needed

2. 👤 USER CONFIRMATION: Present findings, clarify requirements

3. code-architect (2-3x parallel, scoped) → Multiple design approaches
   └→ [Gemini review each if enabled] → Validate → Auto-fix if needed

4. 👤 USER CONFIRMATION: Present options, get design choice

5. code-implementer → Phased implementation
   └→ Run tests/lint after each phase → Verify

6. code-reviewer (3x parallel, scoped) → Thorough review
   └→ [Gemini review each if enabled] → Validate → Auto-fix if needed

7. Auto-fix loop (within budget) → Complete
```

**Context passing:** Task + detailed summary (use Handoff Schema below).

---

## Parallel Execution Scope Assignment

When running multiple agents in parallel, assign distinct scopes to avoid duplication:

### Explorer Scopes (2-3x)
```
Explorer-1: Entry points & user-facing flow
Explorer-2: Data model & persistence layer
Explorer-3: Cross-cutting concerns (auth, logging, error handling)
```

### Architect Scopes (2-3x)
```
Architect-1: Minimal change approach (smallest diff, max reuse)
Architect-2: Clean architecture approach (ideal structure)
Architect-3: Pragmatic balance (speed + maintainability)
```

### Reviewer Scopes (3x)
```
Reviewer-1: Bugs, logic errors, security vulnerabilities
Reviewer-2: Code quality, DRY, simplicity
Reviewer-3: Project conventions, integration correctness
```

---

## Handoff Schema

Use this schema when passing context between agents:

```yaml
handoff:
  task: "[Original user request]"
  complexity: "[Trivial|Simple|Standard|Complex]"

  context:
    key_files:
      - path: "[file path]"
        relevance: "[why this file matters]"
    patterns_found:
      - "[Pattern name]: [Brief description]"
    constraints:
      - "[Constraint or requirement]"

  decisions:
    - "[Decision made]: [Rationale]"

  open_questions:
    - "[Unresolved question]"

  test_commands:
    - "[Command to run tests]"
    - "[Command to run lint/type-check]"
```

**Passing rules by complexity:**
- **Simple**: `task` only
- **Standard**: `task` + `context.key_files` + `test_commands`
- **Complex**: Full schema

---

## Gemini Review Protocol

### Availability Check
Before using Gemini review, verify MCP tool availability:
```
IF mcp__gemini__gemini-brainstorm is available:
  → Enable Gemini review for Standard/Complex
ELSE:
  → Skip Gemini review, proceed with Claude-only flow
  → Log: "Gemini review skipped: MCP tool unavailable"
```

### Privacy Considerations
```
NEVER send to Gemini:
- Credentials, API keys, secrets
- Personal/sensitive user data
- Proprietary business logic (when user opts out)

ALWAYS:
- Summarize code structure, don't send full files
- Focus on patterns and approach, not implementation details
```

### Review Execution (when enabled)
```
1. CALL: mcp__gemini__gemini-brainstorm
   Prompt: "Review this [agent type] output for:
   - Logical consistency
   - Missing considerations
   - Potential issues

   Summary: [Condensed output, no sensitive data]"

2. EVALUATE Gemini's response:
   - Security/correctness concern? → Apply fix (even if contradicts style)
   - Valid architectural concern? → Apply fix
   - Style/subjective preference? → Ignore, follow project conventions
   - Contradicts project conventions? → Ignore for style, act on correctness

3. Continue to next step
```

---

## Iteration Budget

**Single unified budget per task:**

| Complexity | Total Iteration Budget |
|------------|----------------------|
| Trivial | 0 (no iterations) |
| Simple | 2 |
| Standard | 4 |
| Complex | 6 |

**Budget consumption:**
- Each Gemini review + fix cycle: 1 iteration
- Each auto-fix after reviewer finding: 1 iteration

**When budget exhausted:**
```
→ Stop iteration loops
→ Present current state to user
→ Ask for guidance
```

---

## Definition of Done

A task is complete when ALL of the following are true:

### Code Quality
- [ ] All new/modified code follows project conventions
- [ ] No linter errors (`npm run lint` / `ruff check` or equivalent)
- [ ] No type errors (`tsc` / `mypy` or equivalent)
- [ ] No unrelated changes in diff

### Testing
- [ ] Targeted tests pass (tests for modified code)
- [ ] Full test suite passes (if reasonable runtime)
- [ ] No new test failures introduced

### Security
- [ ] No hardcoded secrets or credentials
- [ ] No new security vulnerabilities introduced
- [ ] Proper input validation at boundaries

### Documentation (if user-facing changes)
- [ ] README updated if needed
- [ ] API docs updated if applicable
- [ ] Inline comments for non-obvious logic

**Verification commands (run before marking complete):**
```bash
# Adjust based on project
git diff --stat                    # Check scope
npm run lint && npm run type-check # Or: ruff check && mypy
npm test                           # Or: pytest
```

---

## Auto-Fix Execution

**Who performs fixes:**
- **Exploration/Architecture issues**: Re-run the same agent with clarified prompt
- **Implementation issues**: Delegate to `code-implementer` with specific fix task
- **Review findings**: Delegate to `code-implementer` with reviewer output

**Fix task format:**
```
Fix the following issues identified by [reviewer/Gemini]:

1. [Issue description]
   Location: [file:line]
   Suggested fix: [approach]

2. [Issue description]
   ...

Constraints:
- Only fix listed issues
- Do not refactor unrelated code
- Run tests after fixes
```

---

## Failure Modes & Fallbacks

| Failure | Action |
|---------|--------|
| Gemini MCP unavailable | Skip Gemini review, Claude-only flow |
| Tests fail repeatedly | Stop, present to user with error output |
| Git not available | Warn user, proceed without git operations |
| Network blocked | Skip WebSearch/WebFetch, use local context only |
| Iteration budget exhausted | Present current state, ask user |

---

## Human Intervention Points

**Required (must wait):**
- Standard/Complex: Design approval before implementation
- Complex: Requirements clarification after exploration
- Any: Security vulnerabilities flagged (confidence >= 90)
- Any: Iteration budget exhausted
- Any: Tests fail after 2 fix attempts

**Not required (proceed automatically):**
- Trivial/Simple: Entire flow
- Auto-fix iterations within budget
- Phase transitions
- Agent spawning decisions
- Minor reviewer findings (confidence < 90)

---

## Task Tracking

Use TodoWrite throughout:
1. Create todos at complexity assessment (one per phase)
2. Mark `in_progress` when starting a phase
3. Mark `completed` immediately when phase done
4. Add new todos if scope expands
5. Never batch completions

---

## Output Format

At completion, summarize:
```
## Summary
- **Task**: [Original request]
- **Complexity**: [Level]
- **What was done**: [Brief description]
- **Files modified**: [List with brief description]
- **Key decisions**: [If any]
- **Tests**: [Pass/Fail status]
- **Next steps**: [If applicable]
```
