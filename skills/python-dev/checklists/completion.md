# Completion Checklist

Verify before marking feature complete.

## Code Quality

- [ ] All tests pass: `pytest`
- [ ] Type check passes: `mypy src/ --strict`
- [ ] Lint passes: `ruff check`
- [ ] Format applied: `ruff format`

## Test Coverage

- [ ] Coverage > 80%: `pytest --cov=src`
- [ ] Unit tests for all domain logic
- [ ] Integration tests for repositories
- [ ] Edge cases covered

## Architecture

- [ ] No layer violations: `python scripts/analyze_dependencies.py`
- [ ] Domain layer has no external dependencies
- [ ] Repository interfaces in domain/
- [ ] Implementations in infrastructure/

## Review

- [ ] Gemini review: "No concerns"
- [ ] All critical/major concerns resolved
- [ ] Design follows existing patterns

## Documentation (Diátaxis)

- [ ] Docstrings for public APIs (Google style)
- [ ] API docs generated: `sphinx-apidoc -f -o docs/reference/api src/`
- [ ] Appropriate doc type updated:
  - [ ] New feature → `tutorials/` or `how-to/`
  - [ ] Config change → `reference/configuration.md`
  - [ ] Architecture change → `explanation/`
- [ ] Docs build: `cd docs && make html`

## Git

- [ ] Feature branch created: `feature/<ticket>-<description>`
- [ ] Commits are atomic and complete
- [ ] Commit messages follow Conventional Commits
- [ ] Docs included in commits (not separate PR)
- [ ] PR created with template
- [ ] PR reviewed and approved

## Final Commands

```bash
# Code quality
ruff format && \
ruff check --fix && \
mypy src/ --strict && \
pytest --cov=src && \
python scripts/analyze_dependencies.py

# Documentation
sphinx-apidoc -f -o docs/reference/api src/
cd docs && make html

# Git
git status  # Verify all changes staged
git log --oneline -5  # Review commits
```

Expected: All pass, coverage > 80%, docs build clean
