# Advanced Fixes

For issues that can't be solved with simple CLAUDE.md additions.

---

## When to Use Advanced Fixes

- Quick-fix didn't work after trying once
- Issue is pattern-specific (only certain file types)
- Issue requires enforcement (not just guidance)
- Issue appears 3+ times in history

---

## Fix Types (Escalation Order)

### 1. Rules Files (`.claude/rules/*.md`)

Use when behavior should apply to specific file patterns.

**Location**: `.claude/rules/` (project) or `~/.claude/rules/` (global)

**Template**:
```markdown
---
paths: "**/*.ts"  # or "src/**", "*.py", etc.
---

# Rules for [File Type/Pattern]

- [Specific rule for these files]
- [Another rule]
```

**Example** - TypeScript files should use strict types:
```markdown
---
paths: "**/*.ts"
---

# TypeScript Rules

- Always use explicit types. No `any` unless absolutely necessary.
- Use strict null checks. Handle undefined cases explicitly.
```

---

### 2. Hooks (`.claude/hooks/`)

Use when you need enforcement, not just guidance.

**Location**: Follow existing patterns in `~/.claude/hooks/`

**Common hook patterns**:

**Pre-tool warning** (warn before destructive actions):
```bash
#!/bin/bash
# Hook: PreToolUse for Bash
# Warn before rm, git push --force, etc.

input=$(cat)
command=$(echo "$input" | jq -r '.tool_input.command // empty')

if echo "$command" | grep -qE '(rm -rf|git push.*--force|DROP TABLE)'; then
  echo "WARNING: Destructive command detected. Please confirm."
  exit 1  # Block the action
fi
exit 0
```

**Post-edit reminder** (remind to run tests after edits):
```bash
#!/bin/bash
# Hook: PostToolUse for Edit/Write
# Remind to run tests

echo "Reminder: Run tests to verify this change."
exit 0
```

---

### 3. Custom Commands (`.claude/commands/`)

Use when a specific workflow needs standardization.

**Template**:
```markdown
---
description: [What this command does]
argument-hint: [Expected arguments]
---

# [Command Name]

[Detailed instructions for Claude to follow]

Steps:
1. [First step]
2. [Second step]
...
```

---

### 4. Skills (`.claude/skills/`)

Use when behavior requires:
- Multiple reference files
- Complex workflows
- Reusable across different contexts

**When to create a skill instead of a command**:
- Needs supporting documentation (references/)
- Needs to be auto-detected (not just manually invoked)
- Complex enough to warrant its own directory

---

## Decision Matrix

| Situation | Recommended Fix |
|-----------|-----------------|
| Generic behavior issue | CLAUDE.md rule |
| File-type specific | Rules file |
| Need hard enforcement | Hook |
| Repeated workflow | Command |
| Complex workflow + references | Skill |
| Same issue 3+ times despite fixes | Escalate to next level |

---

## Scope Decision

| Situation | Scope |
|-----------|-------|
| Issue specific to this project | Project-local (`.claude/`) |
| Issue appears in multiple projects | Global (`~/.claude/`) |
| Team should share the fix | Project-local + commit to repo |
| Personal preference | Global |

---

## Reverting Changes

All advanced fixes should be reversible:

1. **Rules files**: Delete the file
2. **Hooks**: Delete or disable the hook
3. **Commands**: Delete the file
4. **Skills**: Delete the directory
5. **CLAUDE.md auto-sections**: Remove content between markers

Keep track of changes in history.jsonl for easy identification.
