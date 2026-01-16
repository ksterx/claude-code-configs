# Reviewer Subagents

## Role

Quality review subagents. Run **3 in parallel** with different focuses.

## When to Use

- After implementation complete (/feat)
- Before commit (/patch - single reviewer)
- Code quality assessment

## Invocation (3 Parallel)

Launch 3 **general-purpose** subagents simultaneously:

**Simplicity Focus**:
> "Role: Code Reviewer - Simplicity. Review {files} for DRY violations, unnecessary complexity, over-engineering, dead code. Confidence threshold: 80%. Output file:line references only for high-confidence issues."

**Correctness Focus**:
> "Role: Code Reviewer - Correctness. Review {files} for logic errors, edge cases not handled, error handling gaps, race conditions. Confidence threshold: 80%. Output file:line references only for high-confidence issues."

**Conventions Focus**:
> "Role: Code Reviewer - Conventions. Review {files} for project pattern violations, {profile} rule violations, style inconsistencies, missing type hints. Confidence threshold: 80%. Output file:line references only for high-confidence issues."

## Output Format per Reviewer

```markdown
## [Focus] Issues

[count] issues found (confidence ≥80%)

1. `file.py:45` - [issue description]
   Why: [explanation]
   Suggestion: [fix]
```

## Result Aggregation

Main agent aggregates results from 3 reviewers:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Review Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Simplicity:   2 issues
Correctness:  1 issue
Conventions:  0 issues
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 3 high-confidence issues

[1] src/domain/user.py:45
    Type: Simplicity
    Issue: Duplicate validation logic
    Fix: Extract to shared validator

[2] src/domain/user.py:78
    Type: Correctness
    Issue: Missing null check
    Scenario: user.email is None when OAuth login
    Fix: Add guard clause

[3] src/api/handler.py:23
    Type: Simplicity
    Issue: Redundant try-catch
    Fix: Let exception propagate to middleware

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Action: [Fix now] [Fix later] [Proceed as-is]
```

## /patch (Single Reviewer)

For /patch, use single **quality-engineer** subagent:

> "Review this change. Request: {original_request}. Files: {file_list}. Diff: {git_diff}. Check: matches request, no side effects, tests pass, follows patterns, no security issues. Output: APPROVED, NEEDS_FIX with issues, or ESCALATE with reason."

## Principles

1. **Parallel execution** - Run 3 focuses simultaneously for efficiency
2. **High confidence only** - Report only ≥80% confidence issues
3. **Actionable** - Include file:line references and specific fixes
4. **User decides** - Present options, let user choose action
