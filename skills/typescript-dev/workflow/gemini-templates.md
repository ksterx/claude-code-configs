# Gemini Review Templates (TypeScript)

## Context Requirements (CRITICAL)

**Before calling Gemini, Claude MUST gather and include context.**

Gemini reviews code in isolation. Without context, it produces generic/irrelevant feedback.

### Required Context Checklist

| Context | Source | Why |
|---------|--------|-----|
| **Tech Stack** | package.json | Avoid incompatible library suggestions |
| **Project Patterns** | Existing similar code in codebase | Ensure consistency |
| **Conventions** | CLAUDE.md, existing code style | Prevent style conflicts |
| **Design Decisions** | spec.md, plan.md (if exists) | Align with design intent |
| **UI Framework** | shadcn components used | Ensure design system consistency |

### Context Injection Template

```
## Project Context
- Framework: Next.js [version] with App Router
- State: Zustand (global), TanStack Query (server)
- Forms: React Hook Form + Zod
- UI: shadcn/ui, Framer Motion
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
Review this React component.
[code]
```

✅ **Good** (with context):
```
## Project Context
- Framework: Next.js 14 with App Router
- UI: shadcn/ui with custom theme
- State: Zustand for cart, TanStack Query for products
- Conventions: Feature-based structure, PageContainer layout pattern
- Related Code: See existing ProductCard component in features/products/

## Code to Review
[code]

## Review Request
Review this implementation critically against Feature-based Architecture and project conventions.
```

---

## MCP Tools (gemini-mcp)

### gemini-analyze-code

Best for code review with specific focus.

```
Tool: mcp__gemini__gemini-analyze-code
Params:
  code: <code-content>
  language: "typescript"
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
Review this TypeScript implementation with an extremely critical and meticulous attitude.

Evaluate against:
- Feature-based Architecture compliance
- TypeScript strict type safety (no `any`)
- Component composition patterns
- Custom hooks for logic extraction
- Design consistency (shared layouts, spacing)
- Accessibility (a11y)
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
- Type definitions completeness
- Interface design (props, return types)
- Component hierarchy appropriateness
- Hook design (separation of concerns)
- Zod schema correctness

Identify:
1. Design flaws
2. Missing types
3. Potential extensibility issues
```

### Implementation Review

```
Review this implementation with an extremely critical and meticulous attitude.

Evaluate against:
- Feature-based Architecture compliance
- TypeScript strict type safety (no `any`)
- Component composition patterns
- Custom hooks for logic extraction
- Design consistency (PageContainer, PageHeader, spacing)
- Accessibility (semantic HTML, ARIA, keyboard nav)
- Performance (memo, callback, lazy loading)
- TDD compliance (tests exist and pass)

Format: List each concern with severity (Critical/Major/Minor).
```

### Component Review

```
Review this React component critically.

Evaluate:
- Props interface design
- Component composition
- Hook usage
- State management
- Event handling
- Accessibility
- Performance (unnecessary re-renders)
- Error boundaries

Identify ALL concerns.
```

### Hook Review

```
Review this custom hook critically.

Evaluate:
- Return type design
- Dependency array correctness
- Error handling
- Loading state management
- Cache invalidation (if using TanStack Query)
- Side effect cleanup
- TypeScript types

Identify ALL concerns.
```

### Test Review

```
Review these tests critically.

Evaluate:
- Test coverage completeness
- User-centric testing (Testing Library)
- Accessibility testing
- Edge case handling
- Mock usage appropriateness
- AAA pattern compliance
- Async handling

Identify:
1. Missing test cases
2. Weak assertions
3. Implementation details testing (anti-pattern)
```

### Security Review

```
Review this code for security vulnerabilities.

Check for:
- XSS vulnerabilities
- CSRF protection
- Input validation
- Sensitive data exposure
- Authentication/authorization issues
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
