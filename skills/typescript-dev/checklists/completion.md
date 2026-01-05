# Completion Checklist

Verify before marking feature complete.

---

## Code Quality

### Type Safety

- [ ] `npx tsc --noEmit` passes
- [ ] No `any` types (explicit or implicit)
- [ ] All function returns typed
- [ ] Props interfaces defined

### Linting

- [ ] `npm run lint` passes
- [ ] No ESLint warnings
- [ ] Prettier formatting applied

---

## Testing

### Test Execution

- [ ] `npm run test` passes
- [ ] Coverage meets threshold (>80%)
- [ ] No skipped tests
- [ ] No console warnings in tests

### Test Quality

- [ ] All user interactions tested
- [ ] Loading states tested
- [ ] Error states tested
- [ ] Accessibility tested (keyboard, ARIA)
- [ ] Edge cases covered

---

## Review Status

### Gemini Review

- [ ] Design review: APPROVED
- [ ] Implementation review: APPROVED
- [ ] Review validation completed

### Self Review

- [ ] Code follows project patterns
- [ ] No commented-out code
- [ ] No TODO comments
- [ ] No debug statements

---

## Documentation

### Storybook

- [ ] Story file created
- [ ] All variants documented
- [ ] Props documented
- [ ] Usage examples included

### Code Comments

- [ ] TSDoc on exported functions
- [ ] Complex logic explained
- [ ] @example tags where helpful

---

## Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus states visible
- [ ] ARIA labels appropriate

---

## Git

### Commits

- [ ] Atomic commits (one purpose each)
- [ ] Conventional commit format
- [ ] Tests committed with implementation
- [ ] Docs committed with features

### Branch

- [ ] Feature branch from main
- [ ] Branch name follows convention
- [ ] Ready for PR

---

## Final Verification

```bash
# Run all checks
npx tsc --noEmit && npm run lint && npm run test

# Build verification
npm run build

# Storybook verification (if applicable)
npm run storybook -- --smoke-test
```

---

## Before Creating PR

- [ ] All checklist items green
- [ ] Local build succeeds
- [ ] Tests pass in CI-like environment
- [ ] Feature works as expected in browser
- [ ] No breaking changes (or documented)
