# Python Library Profile

## Markers

- `src/`, `pyproject.toml`, `setup.py`
- No framework

## Principles

- Clean public API surface
- Type hints everywhere
- Comprehensive docstrings
- Backward compatibility

## Structure

```
src/
└── mypackage/
    ├── __init__.py  # Public API exports
    ├── core.py      # Core functionality
    ├── utils.py     # Internal utilities
    └── _internal.py # Private implementation
```

## Rules

- `__init__.py` defines public API
- Prefix private modules with `_`
- Deprecation warnings before breaking changes
- Semantic versioning
