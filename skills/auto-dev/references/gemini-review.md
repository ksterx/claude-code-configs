# Gemini Review Protocol

## When to Use
- Standard/Complex complexity only
- After each agent output (exploration, spec, plan, tasks, implementation, review)

## Availability Check
```
IF mcp__gemini__gemini-brainstorm is available:
  → Enable Gemini review
ELSE:
  → Skip, proceed with Claude-only flow
  → Log: "Gemini review skipped: MCP unavailable"
```

## Review Execution
```
1. CALL: mcp__gemini__gemini-brainstorm
   Prompt: "Review this [document type] for:
   - Logical consistency and completeness
   - Missing considerations or edge cases
   - Potential issues or risks
   - Alternative approaches worth considering

   Document: [Condensed summary, no sensitive data]"

2. EVALUATE Gemini's response (be neutral and fair):

   FOR EACH point raised:
   - Is it factually correct? → If no, ignore
   - Is it a security/correctness concern? → Apply fix regardless of style
   - Is it a valid architectural/logical concern? → Apply fix
   - Is it purely stylistic/subjective? → Ignore, follow project conventions
   - Does it contradict project conventions? → Ignore for style, act on correctness

3. IF valid fixes identified:
   → Apply fixes
   → Note: "[Fixed: description]" or "[Ignored: reason]"

4. Continue to human review
```

## Privacy Rules
```
NEVER send to Gemini:
- Credentials, API keys, secrets
- Personal/sensitive user data
- Full source code files

ALWAYS:
- Summarize structure and approach
- Focus on design decisions, not implementation details
```

## Human Review Prompt Format
```
## Review Request: [spec.md / plan.md / tasks.md]

### Document Summary
[Key points from the document]

### Gemini Feedback Applied
- [What was fixed based on Gemini review]

### Gemini Feedback Ignored
- [What was ignored and why]

### Questions for You
- [Any open questions or decisions needed]

### Action Required
Please review and respond with:
- **APPROVED**: Proceed to next step
- **APPROVED WITH CHANGES**: [List specific changes]
- **REVISION NEEDED**: [List concerns]
```
