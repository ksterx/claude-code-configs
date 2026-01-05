# /implement - Implementation Phase

## Flow

1. Create branch (direct)
2. @implementer writes tests (Red)
3. Verify tests fail (direct)
4. @implementer implements (Green)
5. Verify tests pass (direct)
6. @reviewer reviews
7. Iterate 4-6 until APPROVED (max 3)
8. @implementer refactors
9. Commit with @conventional-commits (direct)
10. Create PR (direct)

## Completion

- [ ] Tests written and passing
- [ ] @reviewer: APPROVED
- [ ] Committed and PR created

## Human Intervention

Only after 3 failed iterations.

## Validation

Python: `ruff format && ruff check && mypy src/ --strict && pytest`
TypeScript: `npm run lint && tsc --noEmit && npm test && npm run build`
