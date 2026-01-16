# CLI Tool Profile

## Markers

- `cli.py`, `__main__.py`
- typer/click imports

## Principles

- Single entry point simplicity
- Configuration over code
- Rich terminal output (colors, tables, progress)
- Clear help messages

## Structure

```
src/
├── cli.py           # Entry point with typer/click
├── commands/        # Command implementations
│   ├── init.py
│   └── run.py
├── config.py        # Configuration handling
└── utils.py         # Shared utilities
```

## Rules

- Keep it simple - avoid over-abstraction
- One file per command if small
- Use existing CLI conventions
- Prioritize user experience (help text, errors)
