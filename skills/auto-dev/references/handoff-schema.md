# Handoff Schema

Use this schema when passing context between agents.

```yaml
handoff:
  task: "[Original user request]"
  complexity: "[Trivial|Simple|Standard|Complex]"
  feature_slug: "[kebab-case-name]"

  specs:
    spec_path: "specs/{slug}/spec.md"
    plan_path: "specs/{slug}/plan.md"
    tasks_path: "specs/{slug}/tasks.md"

  context:
    key_files:
      - path: "[file path]"
        relevance: "[why this file matters]"
    patterns:
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

## Passing Rules by Complexity

| Complexity | What to Pass |
|------------|--------------|
| **Simple** | `task` only |
| **Standard** | `task` + `specs` + `context.key_files` + `test_commands` |
| **Complex** | Full schema |
