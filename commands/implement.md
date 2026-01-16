# /implement - Implementation Phase

## Purpose

Execute tasks from tasks.md using TDD cycle.

## Input

```
specs/<NNN>-<feature-name>/
├── spec.md          # Requirements
├── research.md      # Tech decisions
├── plan.md          # Architecture
├── data-model.md    # Entities
└── tasks.md         # Task list (required)
```

## Flow

```mermaid
graph TD
    A["/implement triggered"] --> B["Read tasks.md"]
    B --> C["Create feature branch"]
    C --> D["Pick next task"]
    D --> E{Test task?}
    E -->|Yes| F["Write test (Red)"]
    E -->|No| G["Implement"]
    F --> H["Verify test fails"]
    H --> G
    G --> I["Verify test passes"]
    I --> J["Gemini reviews with context"]
    J --> J1["Claude validates review"]
    J1 --> J2{Validation result?}
    J2 -->|ACCEPTED| K["Apply all fixes"]
    J2 -->|ADJUSTED| K2["Apply valid fixes only"]
    J2 -->|REJECTED| K3["Re-review with more context"]
    K --> L{Concerns fixed?}
    K2 --> L
    K3 --> J
    L -->|Yes| M{More tasks?}
    L -->|No, iterate| J
    M -->|Yes| D
    M -->|No| N["Refactor if needed"]
    N --> O["Commit & PR"]
```

### Review-Validation Loop (CRITICAL)

```mermaid
graph LR
    subgraph "Per Task"
        A["Implement"] --> B["Gemini reviews<br/>(with project context)"]
        B --> C["Claude validates"]
        C --> D{Valid?}
        D -->|ACCEPTED| E["Fix all"]
        D -->|ADJUSTED| F["Fix valid only"]
        D -->|REJECTED| G["Re-prompt"]
        G --> B
        E --> H["Next task"]
        F --> H
    end
```

**Context must include**: Tech stack, project patterns, related code (see `skills/*/workflow/gemini-templates.md`).

## Steps

### 1. Setup

```bash
git checkout -b <NNN>-<feature-name>
```

### 2. Task Execution

Process tasks in order from tasks.md:

```python
for task in tasks:
    if task.has_parallel_marker:
        # Can batch with other [P] tasks
        pass
    
    if task.is_test:
        write_test()  # Red
        verify_test_fails()
    
    implement(task)
    verify_tests_pass()  # Green
    
    review = gemini_review(changed_files)
    while not review.approved:
        fix_concerns(review)
        review = gemini_review(changed_files)
```

### 3. TDD Cycle

For each implementation task:

1. **Red** - Write failing test first
2. **Green** - Implement to pass test
3. **Refactor** - Clean up (maintain green)

### 4. Routing

| Task Type | Route |
|-----------|-------|
| Complex (3+ files) | implementer subagent → Codex |
| Simple (1-2 files) | python-expert subagent / typescript-expert subagent |

### 5. Review Per Task

After each task completion:
- Gemini reviews changes
- Claude validates concerns
- Fix valid issues
- Continue when APPROVED

### 6. Commit Strategy

```bash
# After each user story or logical group
git add .
git commit -m "feat(<scope>): <description>"
```

### 7. Final PR

```bash
git push origin <branch>
# Create PR with summary of implemented tasks
```

## Validation Commands

### Python

```bash
ruff format
ruff check --fix
mypy src/ --strict
pytest
```

### TypeScript

```bash
npm run lint -- --fix
tsc --noEmit
npm test
npm run build
```

## Checklist

- [ ] tasks.md loaded
- [ ] Feature branch created
- [ ] All tasks completed
- [ ] Tests passing
- [ ] Gemini APPROVED each task
- [ ] Code committed
- [ ] PR created

## Iteration Limit

Max 3 review iterations per task. If exceeded → /escalate
