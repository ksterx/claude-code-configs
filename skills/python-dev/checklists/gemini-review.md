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
