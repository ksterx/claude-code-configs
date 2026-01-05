# /bugfix - Bug Fix Phase

## Flow

1. @analyst identifies root cause
2. Create branch (direct)
3. @implementer creates reproduction test
4. Verify test fails (direct)
5. @implementer implements minimal fix
6. Verify test passes (direct)
7. Run full suite (direct)
8. @reviewer checks for regression
9. Commit and PR (direct)

## Principles

- Reproduce first (failing test)
- Minimal change only
- No refactoring

## Human Intervention

Only if root cause unclear.
