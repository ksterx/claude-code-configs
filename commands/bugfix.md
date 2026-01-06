# /bugfix - Bug Fix Phase

## Flow

1. **analyst** subagent identifies root cause
2. Create branch (direct)
3. **implementer** subagent creates reproduction test
4. Verify test fails (direct)
5. **implementer** subagent implements minimal fix
6. Verify test passes (direct)
7. Run full suite (direct)
8. **reviewer** subagent checks for regression
9. Commit and PR (direct)

## Principles

- Reproduce first (failing test)
- Minimal change only
- No refactoring

## Human Intervention

Only if root cause unclear.
