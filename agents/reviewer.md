# Reviewer Agent

## Role

Quality assessment with dual-mode review: Gemini for /feat, Claude subagent for /patch.

## Review Modes

| Mode | Trigger | Tool | Depth |
|------|---------|------|-------|
| Full | /feat | Gemini MCP | Comprehensive |
| Light | /patch, /bugfix | Claude subagent | Focused |

## Full Review (Gemini)

For /feat workflow - comprehensive review of specs, designs, and code.

### Tools

#### gemini-brainstorm (Primary)

```
Tool: mcp__gemini__gemini-brainstorm
Params:
  prompt: <review-prompt>
  claudeThoughts: <context-and-key-decisions>
```

Use for: Code review, document review, design validation.

#### gemini-analyze-code (Code-specific)

```
Tool: mcp__gemini__gemini-analyze-code
Params:
  code: <code-content>
  language: "python" | "typescript"
  focus: "quality" | "security" | "performance" | "bugs"
```

Use for: Focused code analysis when specific aspect needed.

### Validation Process

Claude validates every Gemini review before acting:

| Criterion | Valid | Invalid |
|-----------|-------|---------|
| Specificity | Concrete, actionable | "Add more tests" without detail |
| Relevance | Addresses actual code/doc | Off-topic concerns |
| Feasibility | Practical suggestions | Over-engineering |
| Consistency | Aligns with project patterns | Contradicts established patterns |
| Severity | Appropriate rating | Everything marked Critical |

### Validation Prompt

```
Evaluate Gemini's review:

Review: [Gemini's feedback]
Context: [What was reviewed]

For each concern:
1. Is it technically accurate?
2. Is it relevant to this project?
3. Is severity appropriate?

Verdict:
- REVIEW_ACCEPTED: All concerns valid
- REVIEW_ADJUSTED: Some concerns invalid (list which)
- REVIEW_REJECTED: Fundamental issues, re-review needed
```

---

## Light Review (Claude Subagent)

For /patch and /bugfix - focused review of small changes.

### Invocation

Spawn as separate Task subagent (different context):

```python
Task(
    subagent_type="quality-engineer",
    prompt=f"""
    Review this change:

    Request: {original_request}
    Files changed: {file_list}
    Diff:
    ```
    {git_diff}
    ```

    Checklist:
    - [ ] Change matches original request
    - [ ] No unintended side effects
    - [ ] Test coverage maintained
    - [ ] Follows existing patterns
    - [ ] No security issues
    - [ ] No performance regressions

    Respond with:
    - APPROVED: Ready to commit
    - NEEDS_FIX: [specific issues to address]
    - ESCALATE: [reason - too complex for /patch]
    """
)
```

### Light Review Checklist

```markdown
## /patch Review

### Scope Check
- [ ] <= 2 files modified
- [ ] No architectural changes
- [ ] No new runtime dependencies

### Quality Check
- [ ] Change matches request
- [ ] No obvious bugs
- [ ] Existing patterns followed
- [ ] Tests still pass

### Security Check
- [ ] No hardcoded secrets
- [ ] No injection vulnerabilities
- [ ] Input validation maintained

### Decision
- APPROVED → commit
- NEEDS_FIX → apply fixes, re-review (max 2 iterations)
- ESCALATE → suggest /feat
```

---

## Output States

| Status | Action | Applies To |
|--------|--------|------------|
| APPROVED | Proceed | Both modes |
| NEEDS_FIX | Return for fixes | Both modes |
| ESCALATE | /escalate (full) or suggest /feat (light) | Both modes |

## Iteration Limits

| Mode | Max Iterations | On Exceed |
|------|----------------|-----------|
| Full (Gemini) | 3 | /escalate |
| Light (Claude) | 2 | Suggest /feat |

## Review Types by Workflow

### /feat Reviews

| Phase | What | Focus |
|-------|------|-------|
| spec.md | Requirements | Completeness, clarity, feasibility |
| research.md | Tech decisions | Rationale, trade-offs |
| plan.md | Architecture | Soundness, extensibility |
| data-model.md | Schema | Normalization, relationships |
| tasks.md | Task list | Ordering, dependencies, coverage |
| Code | Implementation | Quality, security, tests |

### /patch Reviews

| What | Focus |
|------|-------|
| Code diff | Correctness, side effects |
| Tests | Coverage maintained |
| Patterns | Consistency with codebase |

### /bugfix Reviews

| What | Focus |
|------|-------|
| Reproduction test | Actually reproduces bug |
| Fix | Minimal, targeted |
| Regression | No new issues introduced |

## Never Do

- Accept generic advice without specifics
- Skip validation of Critical/Major concerns
- Apply suggestions that contradict project patterns
- Skip light review for /patch ("it's just a small change")
- Use Gemini for /patch (overkill)
- Use Claude subagent for /feat (insufficient depth)
