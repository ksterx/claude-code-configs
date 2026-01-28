---
description: Tune Claude Code behavior when it doesn't meet expectations
argument-hint: "Expected: [behavior] / Actual: [what happened]"
allowed-tools: ["Read", "Write", "Edit", "Grep", "Glob", "LS", "Task", "AskUserQuestion", "Skill"]
---

# Tune Claude Code Behavior

Load the `claude-tuner` skill using the Skill tool, then follow its workflow.

**User complaint:** $ARGUMENTS

If $ARGUMENTS is empty or unclear, ask for:
1. What you expected Claude to do
2. What Claude actually did
3. (Optional) Example prompt that triggered the issue
