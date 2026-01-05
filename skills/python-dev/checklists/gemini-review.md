# Gemini Review Checklist

Use when requesting reviews from Gemini.

## Standard Review Prompt

```
Review this implementation with an extremely critical and meticulous attitude.

Evaluate against:
- Clean Architecture compliance
- SOLID principles adherence
- Python 3.13+ type hints
- DRY principle
- Error handling
- Performance considerations

Identify ALL concerns, no matter how minor.
Format: APPROVED / NEEDS_REVISION with concerns list.
```

## Evaluation Points

### Architecture
- [ ] Dependencies point inward (Domain ← App ← Infra)
- [ ] No layer violations
- [ ] Proper separation of concerns

### Code Quality
- [ ] Python 3.13+ type hints (`str | None`, not `Optional`)
- [ ] Generic syntax (`def func[T]()`, not `TypeVar`)
- [ ] No code duplication (DRY)
- [ ] Single responsibility per class/function

### Testing
- [ ] Tests exist for implementation
- [ ] Edge cases covered
- [ ] Tests are isolated

### Security
- [ ] Input validation
- [ ] No hardcoded secrets
- [ ] Proper error messages (no sensitive data)

## Response Format Request

Add to prompt:

```
Format your response as:

## Summary
[APPROVED / NEEDS_REVISION]

## Concerns
- [Critical] ...
- [Major] ...
- [Minor] ...

## Recommendations
1. ...
```

## Iteration

When re-reviewing after fixes:

```
Previous concerns:
[List concerns]

Verify ALL concerns are addressed.
If resolved, respond "No concerns."
```

---

## Review Validation (Claude verifies Gemini's review)

After receiving Gemini's review, Claude validates the review quality.

### Validation Criteria

| Criteria | Description |
|----------|-------------|
| **Technical Accuracy** | Are the technical claims correct? |
| **False Positives** | Are there incorrect issue identifications? |
| **False Negatives** | Are important issues missed? |
| **Severity Appropriateness** | Is Critical/Major/Minor classification correct? |
| **Context Understanding** | Does the review understand project context? |
| **Actionability** | Are recommendations practical and implementable? |
| **Trade-off Consideration** | Are costs and risks of changes considered? |
| **Codebase Consistency** | Do suggestions align with existing patterns? |

### Validation Prompt Template

```
Validate this Gemini review for accuracy and completeness.

## Code Under Review
[Paste the reviewed code]

## Gemini's Review
[Paste Gemini's review]

## Validation Tasks
1. **Technical Accuracy**: Verify each technical claim
2. **False Positive Check**: Identify incorrectly flagged issues
3. **False Negative Check**: Find missed issues (security, performance, SOLID, etc.)
4. **Severity Assessment**: Validate Critical/Major/Minor classification
5. **Context Verification**: Confirm project context is correctly understood
6. **Recommendation Feasibility**: Assess if suggestions are practical

## Output Format
### Validation Result
[VALIDATED / PARTIALLY_VALID / INVALID]

### False Positives Found
- [Issue]: [Reason why it's not actually a problem]

### Missed Issues
- [Severity]: [Issue description]

### Severity Corrections
- [Original]: [Corrected] - [Reason]

### Final Recommendation
[Accept review / Accept with modifications / Re-review needed]
```

### Quick Validation Checklist

Before accepting Gemini's review:

- [ ] All Critical issues are genuinely critical
- [ ] No false positives in the concerns list
- [ ] Security issues are not missed
- [ ] Performance concerns are valid for the use case
- [ ] SOLID/Clean Architecture violations are correctly identified
- [ ] Recommendations don't conflict with existing codebase patterns
- [ ] Suggestions are implementable without major refactoring (unless warranted)

### When to Override Gemini's Review

| Situation | Action |
|-----------|--------|
| False positive identified | Document and skip the fix |
| Severity overestimated | Downgrade and proceed |
| Severity underestimated | Escalate and address immediately |
| Context misunderstanding | Provide context and re-review |
| Conflicting patterns | Follow existing codebase conventions |
