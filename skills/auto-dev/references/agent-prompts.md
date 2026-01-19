# Agent Invocation Templates

## code-explorer

### Standard (detailed)
```
Analyze [area] for implementing [feature]. Provide detailed analysis.
```

### Simple (summary)
```
Analyze [area] for [feature]. Summary mode - key findings + essential files only.
```

### Complex (scoped)
```
Analyze [area] for [feature]. Scope: [entry/data/cross-cutting]
```

---

## code-architect

### Spec generation
```
Generate spec for [feature]. Context from exploration: [summary].
Output to: specs/{feature-slug}/spec.md

Use template from: ~/.claude/skills/auto-dev/references/templates/spec.md
```

### Plan generation
```
Generate plan for [feature]. Read specs/{feature-slug}/spec.md first.
Output to: specs/{feature-slug}/plan.md

Use template from: ~/.claude/skills/auto-dev/references/templates/plan.md
```

### Plan with approach (Complex parallel)
```
Generate plan for [feature]. Approach: [minimal/clean/pragmatic].
Read specs/{feature-slug}/spec.md first.
```

### Tasks generation
```
Generate tasks for [feature]. Read specs/{feature-slug}/spec.md and plan.md.
Output to: specs/{feature-slug}/tasks.md

Use template from: ~/.claude/skills/auto-dev/references/templates/tasks.md
```

---

## code-implementer

```
Implement [feature] following:
- Spec: specs/{feature-slug}/spec.md
- Plan: specs/{feature-slug}/plan.md
- Tasks: specs/{feature-slug}/tasks.md
Principles: SOLID, DRY, Clean Architecture (if applicable)
Style: Match existing codebase conventions
```

---

## code-reviewer

### Spec compliance
```
Check spec compliance for [feature].
Spec: specs/{feature-slug}/spec.md
```

### Standard review
```
Review implementation for [feature]. Focus: [bugs/quality/conventions]
```
