# Gemini Review Checklist

Use when requesting and evaluating Gemini reviews.

---

## Review Request Format

```
Review this [code/design/test] with extremely critical attitude.

[Code or design content]

Evaluate:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

Format: APPROVED / NEEDS_REVISION
If NEEDS_REVISION, categorize concerns as:
- [Critical]: Must fix before proceeding
- [Major]: Should fix, affects quality
- [Minor]: Can fix later, style preference
```

---

## Standard Criteria by Type

### Component Review

- [ ] Component composition
- [ ] Props interface design
- [ ] Accessibility (WCAG compliance)
- [ ] Type safety
- [ ] Design consistency with project patterns

### Test Review

- [ ] Test coverage completeness
- [ ] AAA pattern adherence
- [ ] Edge case coverage
- [ ] Assertion quality
- [ ] Mock appropriateness

### Design Review

- [ ] Type completeness
- [ ] Interface design patterns
- [ ] Extensibility
- [ ] Consistency with existing types

### API Integration Review

- [ ] Error handling
- [ ] Loading state management
- [ ] Cache invalidation
- [ ] Optimistic updates (if applicable)

---

## Review Validation

After receiving Gemini's review, validate:

### Check for Over-Criticism

- [ ] Concern is actually applicable to this context?
- [ ] Project already has different pattern for this?
- [ ] Concern conflicts with existing architecture?
- [ ] Suggestion adds unnecessary complexity?

### Check for Under-Criticism

- [ ] Security implications covered?
- [ ] Accessibility checked?
- [ ] Error boundaries considered?
- [ ] Performance implications evaluated?

---

## Validation Outcomes

### REVIEW_ACCEPTED

Apply all suggested changes. Proceed with implementation.

### REVIEW_ADJUSTED

```
Gemini suggested: [original suggestion]
Adjustment: [modified approach]
Reason: [why adjustment needed]
```

### REVIEW_REJECTED

```
Gemini suggested: [original suggestion]
Rejection reason: [why not applicable]
Evidence: [project pattern or constraint]
```

---

## Validation Prompt

Use this prompt for self-validation:

```
Evaluate your previous review against these criteria:
1. Are concerns project-specific or generic best practices?
2. Do suggestions conflict with existing patterns in the codebase?
3. Is the severity categorization appropriate?
4. Are there any false positives based on common patterns?

Provide adjusted review if needed.
```

---

## Review Response Template

```
## Summary
[APPROVED / NEEDS_REVISION]

## Concerns (if NEEDS_REVISION)

### Critical
- [Issue]: [Explanation]

### Major
- [Issue]: [Explanation]

### Minor
- [Issue]: [Explanation]

## Recommendations
1. [Action item]
2. [Action item]
```
