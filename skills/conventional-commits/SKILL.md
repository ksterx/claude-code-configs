---
name: conventional-commits
description: Conventional Commits format for standardized commit messages. Use when creating commits, reviewing commit history, or generating changelogs.
---

# Conventional Commits

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types

| Type       | Description                              | Changelog Section |
|------------|------------------------------------------|-------------------|
| `feat`     | New feature                              | Features          |
| `fix`      | Bug fix                                  | Bug Fixes         |
| `docs`     | Documentation only changes               | Documentation     |
| `style`    | Formatting, no code change               | -                 |
| `refactor` | Code change without feat/fix             | -                 |
| `perf`     | Performance improvement                  | Performance       |
| `test`     | Adding or fixing tests                   | -                 |
| `build`    | Build system or dependencies             | -                 |
| `ci`       | CI configuration changes                 | -                 |
| `chore`    | Other changes (tooling, etc.)            | -                 |
| `revert`   | Reverts a previous commit                | Reverts           |

## Examples

### Simple Commits

```bash
# Feature
git commit -m "feat: add user authentication"

# Bug fix
git commit -m "fix: resolve memory leak in WebSocket handler"

# Documentation
git commit -m "docs: update API reference for v2 endpoints"

# Refactoring
git commit -m "refactor: extract validation logic to separate module"

# Tests
git commit -m "test: add integration tests for payment flow"
```

### With Scope

Scope indicates the area of the codebase affected:

```bash
git commit -m "feat(auth): implement JWT token refresh"
git commit -m "fix(api): handle timeout errors in user service"
git commit -m "docs(readme): add installation instructions"
git commit -m "test(cart): add unit tests for discount calculation"
```

### With Body

For commits that need more explanation:

```bash
git commit -m "fix(parser): handle edge case in date parsing

The parser was failing when dates were in ISO format with
timezone offset. This fix normalizes all dates to UTC before
parsing.

Fixes: #123"
```

### Breaking Changes

Use `!` after type/scope or `BREAKING CHANGE:` in footer:

```bash
# With exclamation mark
git commit -m "feat(api)!: change response format to JSON:API"

# With footer
git commit -m "feat(api): change response format to JSON:API

BREAKING CHANGE: Response format changed from custom JSON to JSON:API spec.
All API clients must update their parsing logic."
```

## Rules

### Subject Line

- Use imperative mood: "add" not "adds" or "added"
- Don't capitalize first letter after colon
- No period at the end
- Maximum 72 characters (50 is ideal)

### Good vs Bad Examples

```bash
# ✅ Good
git commit -m "feat: add password reset functionality"
git commit -m "fix: prevent race condition in session handler"
git commit -m "refactor: simplify user validation logic"

# ❌ Bad - Past tense
git commit -m "feat: added password reset functionality"

# ❌ Bad - Capitalized
git commit -m "feat: Add password reset functionality"

# ❌ Bad - With period
git commit -m "feat: add password reset functionality."

# ❌ Bad - Vague
git commit -m "fix: fix bug"
git commit -m "feat: update code"
git commit -m "chore: changes"
```

### Body Guidelines

- Wrap at 72 characters
- Explain **what** and **why**, not **how**
- Separate from subject with blank line

### Footer Keywords

```bash
# Reference issues
Refs: #123
Refs: #123, #456

# Close issues
Fixes: #123
Closes: #123
Resolves: #123

# Co-authors
Co-authored-by: Name <email@example.com>

# Breaking changes
BREAKING CHANGE: description of breaking change
```

## Commit Message Template

Create a commit template for consistency:

```bash
# .gitmessage
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>
#
# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
# Scope: optional area (api, auth, ui, db, etc.)
# Subject: imperative, lowercase, no period, max 50 chars
# Body: explain what and why, wrap at 72 chars
# Footer: Fixes #issue, BREAKING CHANGE: description
```

Configure git to use the template:

```bash
git config --global commit.template ~/.gitmessage
```

## Semantic Versioning Impact

Commits affect version bumps in semantic versioning:

| Commit Type      | Version Bump | Example            |
|------------------|--------------|---------------------|
| `fix`            | PATCH        | 1.0.0 → 1.0.1      |
| `feat`           | MINOR        | 1.0.0 → 1.1.0      |
| `BREAKING CHANGE`| MAJOR        | 1.0.0 → 2.0.0      |

## Automation Tools

- **commitlint**: Lint commit messages against convention
- **husky**: Git hooks for commit validation
- **standard-version**: Automatic changelog generation
- **semantic-release**: Automated releases based on commits

### commitlint Configuration

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ]],
    'subject-max-length': [2, 'always', 72],
  }
};
```

## Quick Reference Card

```
feat:     New feature (MINOR version bump)
fix:      Bug fix (PATCH version bump)
docs:     Documentation changes
style:    Formatting, no code change
refactor: Code restructure, no behavior change
perf:     Performance improvement
test:     Adding/updating tests
build:    Build system, dependencies
ci:       CI/CD configuration
chore:    Maintenance tasks
revert:   Revert previous commit

Breaking: Add ! or BREAKING CHANGE footer (MAJOR version bump)
Scope:    Optional, in parentheses after type
Subject:  Imperative mood, lowercase, no period
```

