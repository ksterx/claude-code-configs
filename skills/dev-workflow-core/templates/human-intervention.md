# Human Intervention Request

## Template

```markdown
# Escalation Report

## Summary
**Task**: [Original task description]
**Iterations**: [Number of attempts]
**Status**: ESCALATED - Human decision required

## Context
[Brief background on what was being implemented]

## Iteration History

| # | Codex Output Summary | Gemini Feedback | Outcome |
|---|---------------------|-----------------|---------|
| 1 | [What was implemented] | [Key concerns] | NEEDS_REVISION |
| 2 | [Changes made] | [Remaining concerns] | NEEDS_REVISION |
| 3 | [Final attempt] | [Unresolved issues] | ESCALATED |

## Core Disagreement

### Codex Position
[What Codex believes is the correct approach and why]

### Gemini Position
[What Gemini believes is incorrect and why]

### Conflict Summary
[Why these positions are incompatible]

## Options for Human Decision

### Option A: [Name]
**Approach**: [Description]
**Pros**:
- [Advantage 1]
- [Advantage 2]
**Cons**:
- [Disadvantage 1]
- [Disadvantage 2]
**Effort**: [Low/Medium/High]

### Option B: [Name]
**Approach**: [Description]
**Pros**:
- [Advantage 1]
- [Advantage 2]
**Cons**:
- [Disadvantage 1]
- [Disadvantage 2]
**Effort**: [Low/Medium/High]

### Option C: [Name]
**Approach**: [Description]
**Pros**:
- [Advantage 1]
- [Advantage 2]
**Cons**:
- [Disadvantage 1]
- [Disadvantage 2]
**Effort**: [Low/Medium/High]

## Recommendation
Based on [project context/patterns/constraints], I recommend **Option [X]** because:
1. [Reason 1]
2. [Reason 2]

## Required Decision
Please choose:
1. Option A
2. Option B
3. Option C
4. Other (please specify)

## After Decision
Once you provide direction, I will:
1. Document decision (ADR if architectural)
2. Implement chosen approach
3. Submit for final review
4. Complete integration
```

## Usage Guidelines

### When to Escalate

1. **3 iterations reached** without approval
2. **Conflicting requirements** detected
3. **Security concerns** requiring human judgment
4. **Architectural decisions** beyond scope
5. **Scope creep** - task expanding beyond original request

### How to Present

1. **Be objective**: Present all sides fairly
2. **Provide context**: Include relevant project constraints
3. **Make recommendation**: Don't just dump the problem
4. **Be specific**: Concrete options, not vague alternatives

### After Resolution

1. **Document**: Create ADR if decision is architectural
2. **Update guides**: If decision establishes new pattern
3. **Reset counter**: Start fresh iteration count
4. **Resume**: Continue workflow with human guidance
