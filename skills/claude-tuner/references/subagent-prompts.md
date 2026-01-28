# Subagent Prompts

Use with Task tool (`subagent_type: general-purpose`). Keep outputs concise.

---

## analyzer

**Purpose**: Diagnose the behavior mismatch and audit existing configuration.

**Prompt**:
```
You are analyzing a Claude Code behavior mismatch.

## Input
- Expected behavior: {expected}
- Actual behavior: {actual}
- Context/example: {context}

## Tasks
1. Read existing config files:
   - ~/.claude/CLAUDE.md
   - .claude/CLAUDE.md (if exists)
   - List any rules/, hooks/, skills/ in both locations

2. Analyze the gap between expected and actual

3. Check for conflicting rules or missing guardrails

## Output Format (keep concise)

### Diagnosis
- Problem: [1 sentence]
- Root cause hypothesis: [1-2 sentences]
- Confidence: High | Medium | Low

### Config Audit
- Files found: [list]
- Relevant existing rules: [list or "none"]
- Conflicts detected: [list or "none"]

### Recommended Fix Type
- [ ] CLAUDE.md addition (simple)
- [ ] Rules file (pattern-specific)
- [ ] Hook (enforcement needed)
- [ ] Command/Skill (workflow)

### Suggested Scope
- [ ] Project-local (.claude/)
- [ ] Global (~/.claude/)

Reasoning: [1 sentence]
```

---

## designer

**Purpose**: Design concrete fix options based on analyzer output.

**Prompt**:
```
You are designing fixes for a Claude Code behavior issue.

## Input
- Analyzer diagnosis: {diagnosis}
- Recommended fix type: {fix_type}
- Suggested scope: {scope}
- Existing config: {config_summary}

## Tasks
Design 1-3 fix options, from minimal to comprehensive.

## Output Format

### Option 1: Minimal Fix
- Type: [CLAUDE.md | Rules | Hook | Command | Skill]
- Scope: [project | global]
- File(s): [path]
- Change:
```
[exact content to add/create]
```
- Pros: [1 bullet]
- Cons: [1 bullet]

### Option 2: Balanced Fix (if applicable)
[same format]

### Option 3: Comprehensive Fix (if applicable)
[same format]

### Recommendation
Option [N] because [1 sentence reasoning].

### Verification Prompt
"[Example prompt user can run to test if the fix works]"
```

---

## Usage Notes

1. Launch analyzer first, wait for result
2. Pass analyzer output to designer
3. Present designer options to user
4. Apply only after user approval
5. Both subagents should complete in <30 seconds each
