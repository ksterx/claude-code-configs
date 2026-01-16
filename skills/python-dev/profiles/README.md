# Project Profiles

Profile-aware development. Adapts approach based on detected or specified project type.

## Detection

```python
def detect_profile(project_root: Path) -> str:
    if has_markers(["app/domain", "app/use_cases"]):
        return "clean-arch"
    if has_markers(["train.py", "models/"]) or has_imports(["torch", "tensorflow"]):
        return "ml-package"
    if has_markers(["cli.py", "__main__.py"]) or has_imports(["typer", "click"]):
        return "cli"
    if has_markers(["src/", "pyproject.toml"]) and not has_markers(["app/"]):
        return "python-lib"
    return "script"
```

## Profiles

| Profile | File | Complexity |
|---------|------|------------|
| Clean Architecture | [clean-arch.md](clean-arch.md) | High |
| CLI Tool | [cli.md](cli.md) | Medium |
| ML Package | [ml-package.md](ml-package.md) | Medium-High |
| Python Library | [python-lib.md](python-lib.md) | Medium |
| Script | [script.md](script.md) | Low |

## Common Principles (All Profiles)

- **Tests first** - TDD regardless of project type
- **Type hints** - Always use typing
- **Error handling** - Clear, actionable error messages
- **Security** - No hardcoded secrets, validate inputs
