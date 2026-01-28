# Task Tracking Protocol

## Purpose

Maintain workflow state across context compacting using TodoWrite/TaskCreate tools.
When compacting occurs, TaskList provides immediate context recovery.

---

## Task Creation: Immediately After Complexity Assessment

Create tasks based on complexity level. Use `TaskCreate` for each task.

### Trivial

No task tracking required. Execute directly.

### Simple

```
TaskCreate: [AUTO-DEV] {feature}: Explore codebase (Launch code-explorer subagent)
TaskCreate: [AUTO-DEV] {feature}: Implement (Launch code-implementer subagent)
TaskCreate: [AUTO-DEV] {feature}: Review & fix (Launch code-reviewer subagent)
```

### Standard

```
TaskCreate: [AUTO-DEV] {feature}: Explore codebase (Launch code-explorer subagent)
TaskCreate: [AUTO-DEV] {feature}: Write spec.md (Launch code-architect subagent)
TaskCreate: [AUTO-DEV] {feature}: Gemini review spec
TaskCreate: [AUTO-DEV] {feature}: Human approval spec
TaskCreate: [AUTO-DEV] {feature}: Write plan.md (Launch code-architect subagent)
TaskCreate: [AUTO-DEV] {feature}: Gemini review plan
TaskCreate: [AUTO-DEV] {feature}: Human approval plan
TaskCreate: [AUTO-DEV] {feature}: Write tasks.md (Launch code-architect subagent)
TaskCreate: [AUTO-DEV] {feature}: Gemini review tasks
TaskCreate: [AUTO-DEV] {feature}: Human approval tasks
TaskCreate: [AUTO-DEV] {feature}: Implement (Launch code-implementer subagent)
TaskCreate: [AUTO-DEV] {feature}: Spec compliance review (Launch code-reviewer subagent)
TaskCreate: [AUTO-DEV] {feature}: Final review & fix (Launch code-reviewer subagent)
TaskCreate: [AUTO-DEV] {feature}: Human final approval
```

### Complex

```
TaskCreate: [AUTO-DEV] {feature}: Explore codebase (Launch code-explorer subagents)
  metadata: { "agent": "code-explorer", "scopes": ["entry", "data", "cross-cutting"], "parallel": true }

TaskCreate: [AUTO-DEV] {feature}: Gemini review exploration

TaskCreate: [AUTO-DEV] {feature}: Human review requirements

TaskCreate: [AUTO-DEV] {feature}: Write spec.md (Launch code-architect subagent)

TaskCreate: [AUTO-DEV] {feature}: Gemini review spec

TaskCreate: [AUTO-DEV] {feature}: Human approval spec

TaskCreate: [AUTO-DEV] {feature}: Write plan.md approaches (Launch code-architect subagents)
  metadata: { "agent": "code-architect", "scopes": ["minimal", "clean", "pragmatic"], "parallel": true }

TaskCreate: [AUTO-DEV] {feature}: Gemini review plans

TaskCreate: [AUTO-DEV] {feature}: Human choose & approval plan

TaskCreate: [AUTO-DEV] {feature}: Write tasks.md (Launch code-architect subagent)

TaskCreate: [AUTO-DEV] {feature}: Gemini review tasks

TaskCreate: [AUTO-DEV] {feature}: Human approval tasks

TaskCreate: [AUTO-DEV] {feature}: Implement phase N (Launch code-implementer subagent)

TaskCreate: [AUTO-DEV] {feature}: Spec compliance review (Launch code-reviewer subagent)

TaskCreate: [AUTO-DEV] {feature}: Final review (Launch code-reviewer subagents)
  metadata: { "agent": "code-reviewer", "scopes": ["bugs", "quality", "conventions"], "parallel": true }

TaskCreate: [AUTO-DEV] {feature}: Auto-fix & human final approval
```

---

## Task Naming Convention

```
[AUTO-DEV] {feature-slug}: {action}
```

Examples:
- `[AUTO-DEV] user-auth: Explore codebase (Launch code-explorer subagent)`
- `[AUTO-DEV] user-auth: Write spec.md (Launch code-architect subagent)`
- `[AUTO-DEV] user-auth: Gemini review spec`
- `[AUTO-DEV] user-auth: Human approval spec`
- `[AUTO-DEV] user-auth: Implement 1/5 - Create auth service (Launch code-implementer subagent)`

---

## Task Status Updates

| Event | Action |
|-------|--------|
| Starting a phase | `TaskUpdate: status = in_progress` |
| Phase complete | `TaskUpdate: status = completed` |
| Waiting for human | Keep `in_progress`, description notes "Awaiting approval" |
| Blocked by issue | Keep `in_progress`, create blocker task |

---

## Implementation Task Granularity

After `tasks.md` is approved, create individual implementation tasks:

```
TaskCreate: [AUTO-DEV] {feature}: Implement 1/N - {task description} (Launch code-implementer subagent)
TaskCreate: [AUTO-DEV] {feature}: Implement 2/N - {task description} (Launch code-implementer subagent)
...
```

Update N as tasks are discovered. Each maps to a checkbox in tasks.md.

---

## Context Recovery (Post-Compacting)

When context seems lost or after compacting:

```
1. TaskList → Identify current state
2. Find in_progress task → Resume from there
3. Read relevant SDD files if needed:
   - specs/{feature}/spec.md
   - specs/{feature}/plan.md
   - specs/{feature}/tasks.md
4. Continue workflow
```

---

## Task Description Template

Include in task description for context recovery:

```
Feature: {feature-slug}
Complexity: {level}
SDD Path: specs/{feature-slug}/
Current Phase: {exploration|specification|implementation|review}
```

---

## Metadata for Parallel Subagent Tasks

For tasks that launch multiple subagents in parallel, use `metadata` to specify scopes:

```javascript
TaskCreate({
  subject: "[AUTO-DEV] {feature}: Explore codebase (Launch code-explorer subagents)",
  description: "...",
  metadata: {
    "agent": "code-explorer",
    "scopes": ["entry", "data", "cross-cutting"],
    "parallel": true
  }
})
```

**Scope definitions:**

| Agent | Scopes | Description |
|-------|--------|-------------|
| code-explorer | `entry` | Entry points, API routes, handlers |
| | `data` | Data models, schemas, storage |
| | `cross-cutting` | Auth, logging, error handling |
| code-architect | `minimal` | Smallest change, least risk |
| | `clean` | Best practices, may refactor |
| | `pragmatic` | Balance of speed and quality |
| code-reviewer | `bugs` | Logic errors, edge cases |
| | `quality` | Code quality, maintainability |
| | `conventions` | Project style, patterns |

**Recovery:** After compacting, `TaskGet` retrieves metadata for scope information.

---

## Example: Standard Workflow Task Flow

```
[1] Explore codebase (Launch code-explorer subagent)           in_progress → completed
[2] Write spec.md (Launch code-architect subagent)             pending → in_progress → completed
[3] Gemini review spec                                         pending → in_progress → completed
[4] Human approval spec                                        pending → in_progress (awaiting) → completed
[5] Write plan.md (Launch code-architect subagent)             pending → in_progress → completed
[6] Gemini review plan                                         pending → in_progress → completed
[7] Human approval plan                                        pending → in_progress (awaiting) → completed
[8] Write tasks.md (Launch code-architect subagent)            pending → in_progress → completed
[9] Gemini review tasks                                        pending → in_progress → completed
[10] Human approval tasks                                      pending → in_progress (awaiting) → completed
[11] Implement 1/3 (Launch code-implementer subagent)          pending → in_progress → completed
[12] Implement 2/3 (Launch code-implementer subagent)          pending → in_progress → completed
[13] Implement 3/3 (Launch code-implementer subagent)          pending → in_progress → completed
[14] Spec compliance review (Launch code-reviewer subagent)    pending → in_progress → completed
[15] Final review & fix (Launch code-reviewer subagent)        pending → in_progress → completed
[16] Human final approval                                      pending → in_progress (awaiting) → completed
```

---

## Quick Reference

| Action | Tool |
|--------|------|
| Create task | `TaskCreate` |
| Update status | `TaskUpdate` with `status` |
| View all tasks | `TaskList` |
| Get task details | `TaskGet` with `taskId` |
| Add dependency | `TaskUpdate` with `addBlockedBy` |
