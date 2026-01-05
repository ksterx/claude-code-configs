# Iteration Control Protocol

## Purpose

Prevent infinite loops between Codex and Gemini when they cannot reach agreement.

## Maximum Iteration Rule

```
MAX_ITERATIONS = 3

for iteration in range(MAX_ITERATIONS):
    implementation = codex.implement(task)
    review = gemini.review(implementation)

    if review.status == "APPROVED":
        break
    elif iteration == MAX_ITERATIONS - 1:
        escalate_to_human(task, history)
```

## Iteration Tracking

### Per-Task Counter

Track iterations for each discrete task:

```
Task: "Implement UserCard component"
├── Iteration 1: NEEDS_REVISION (accessibility)
├── Iteration 2: NEEDS_REVISION (type safety)
└── Iteration 3: Escalate to human
```

### Escalation Triggers

Escalate immediately (bypass iteration limit) when:

1. **Conflicting Requirements**: Gemini's suggestions contradict project patterns
2. **Scope Creep**: Fixes introduce new features beyond original task
3. **Architectural Impact**: Changes affect multiple systems
4. **Security Concerns**: Potential vulnerabilities identified

## Escalation Process

### Step 1: Generate Summary

Use `templates/human-intervention.md` to create:

```markdown
## Escalation Report

### Task
[Original task description]

### Iteration History
| # | Codex Output | Gemini Feedback | Status |
|---|--------------|-----------------|--------|
| 1 | [summary]    | [concerns]      | NEEDS_REVISION |
| 2 | [summary]    | [concerns]      | NEEDS_REVISION |
| 3 | [summary]    | [concerns]      | ESCALATED |

### Core Disagreement
[Why Codex and Gemini cannot agree]

### Options for Human
1. [Option A with trade-offs]
2. [Option B with trade-offs]
3. [Option C with trade-offs]

### Recommendation
[Claude's recommendation based on project context]
```

### Step 2: Pause and Request

1. Stop automated workflow
2. Present summary to user
3. Wait for human decision
4. Resume with human guidance

## Recovery After Escalation

Once human provides guidance:

1. Document decision in ADR if architectural
2. Update relevant guides if pattern change
3. Reset iteration counter
4. Resume workflow with new constraints
