# /escalate - Human Decision Required

## Triggers

- 3 iterations without APPROVED
- Conflicting requirements
- Architecture impact
- Security concern

## Output

```markdown
# Escalation Report

## Summary
Task: [description]
Trigger: [reason]

## Options
A: [approach, pros, cons]
B: [approach, pros, cons]

## Recommendation
[recommended option and why]
```

## After Decision

1. Document decision (ADR if architectural)
2. Reset iteration count
3. Resume workflow

## Template

@~/.claude/skills/dev-workflow-core/templates/human-intervention.md
