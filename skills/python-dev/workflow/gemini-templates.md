# Gemini Review Templates (Python)

## Context Requirements (CRITICAL)

**Before calling Gemini, Claude MUST gather and include context.**

Gemini reviews code in isolation. Without context, it produces generic/irrelevant feedback.

### Required Context Checklist

| Context | Source | Why |
|---------|--------|-----|
| **Tech Stack** | pyproject.toml, requirements.txt | Avoid incompatible library suggestions |
| **Project Patterns** | Existing similar code in codebase | Ensure consistency |
| **Conventions** | CLAUDE.md, existing code style | Prevent style conflicts |
| **Design Decisions** | spec.md, plan.md (if exists) | Align with design intent |
| **Constraints** | Project-specific limitations | Avoid impractical suggestions |

### Context Injection Template

```
## Project Context
- Project Type: [clean-arch / cli / ml-package / python-lib / script]
- Tech Stack: [key dependencies from pyproject.toml]
- Python Version: [version]
- Conventions: [observed patterns from codebase]
- Related Code: [similar implementations if relevant]
- Design Context: [key decisions from spec.md/plan.md if available]

## Code to Review
[actual code]

## Review Request
[standard review prompt below]
```

### Example: Good vs Bad Context

❌ **Bad** (no context):
```
Review this code for quality.
[code]
```

✅ **Good** (with context):
```
## Project Context
- Project Type: clean-arch
- Tech Stack: FastAPI, SQLAlchemy, Pydantic v2
- Conventions: Repository pattern for data access, domain entities are pure dataclasses
- Related Code: See existing UserRepository pattern using Protocol

## Code to Review
[code]

## Review Request
Review this implementation critically against Clean Architecture and project conventions.
```

---

## MCP Tools (gemini-mcp)

### gemini-analyze-code

Best for code review with specific focus.

```
Tool: mcp__gemini__gemini-analyze-code
Params:
  code: <code-content>
  language: "python"
  focus: "quality" | "security" | "performance" | "bugs" | "general"
```

### gemini-query

Best for custom review prompts with full context.

```
Tool: mcp__gemini__gemini-query
Params:
  model: "pro"
  prompt: <custom-prompt-with-code>
```

---

## Standard Review Prompt

```
Review this Python implementation with an extremely critical and meticulous attitude.

Evaluate against:
- Clean Architecture compliance (dependencies point inward)
- SOLID principles adherence
- Python 3.12+ type hint usage (str | None, NOT Optional)
- DRY principle
- Error handling appropriateness
- Performance considerations

Identify ALL concerns, no matter how minor.

Format response as:
## Summary
[APPROVED / NEEDS_REVISION / ESCALATE]

## Concerns
- [Critical] ...
- [Major] ...
- [Minor] ...

## Recommendations
1. ...
```

---

## Phase-Specific Templates

### Analysis Review

```
Analyze this codebase investigation.

Evaluate:
- Completeness of analysis
- Accuracy of pattern identification
- Missed architectural concerns
- Suggested approach viability

Provide:
1. Strengths of current codebase
2. Concerns to address
3. Recommendations for implementation
```

### Design Review

```
Review this design with an extremely critical attitude.

Evaluate:
- Domain layer purity (no framework dependencies)
- Interface segregation
- Value object immutability
- Repository interface completeness
- Type hint correctness (Python 3.12+)

Identify:
1. Design flaws
2. Missing abstractions
3. Potential extensibility issues
```

### Implementation Review

```
Review this implementation with an extremely critical and meticulous attitude.

Evaluate against:
- Clean Architecture compliance
- SOLID principles adherence
- Python 3.12+ type hints (str | None, NOT Optional)
- TDD compliance (tests exist and pass)
- DRY principle
- Error handling
- Performance considerations
- Security concerns

Format: List each concern with severity (Critical/Major/Minor).
```

### Test Review

```
Review these tests critically.

Evaluate:
- Test coverage completeness
- Edge case handling
- Test isolation
- AAA pattern compliance
- Assertion quality
- Mock usage appropriateness

Identify:
1. Missing test cases
2. Weak assertions
3. Test coupling issues
```

### Security Review

```
Review this code for security vulnerabilities.

Check for:
- Input validation gaps
- Authentication/authorization issues
- Injection vulnerabilities (SQL, command, etc.)
- Sensitive data exposure
- Dependency vulnerabilities

Flag any security concern as Critical.
```

---

## Review Validation

When Gemini feedback seems incorrect:

```
Evaluate the validity of this code review.

For each concern, check:
1. Accuracy: Does the issue actually exist?
2. Relevance: Appropriate for this project scope?
3. Severity: Correctly rated?

Verdict:
- REVIEW_ACCEPTED: Proceed with all fixes
- REVIEW_ADJUSTED: Apply corrected concern list
- REVIEW_REJECTED: Re-review needed
```

---

## Iteration Pattern

When concerns are found:

```
The following concerns were raised in the previous review:
[List concerns]

Verify that ALL concerns have been addressed.
If any remain unresolved, list them again.
If all resolved, respond with "No concerns."
```
