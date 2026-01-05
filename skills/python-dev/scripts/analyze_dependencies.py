"""Clean Architecture dependency violation checker.

Detects imports that violate layer rules:
- Domain layer cannot import from application/infrastructure
- Application layer cannot import from infrastructure

Usage:
    python scripts/analyze_dependencies.py
    python scripts/analyze_dependencies.py --src path/to/src
"""

from __future__ import annotations

import ast
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Violation:
    """Represents a dependency violation."""

    file: Path
    line: int
    imported: str
    reason: str


def get_layer(path: Path, src_root: Path) -> str | None:
    """Determine which layer a file belongs to."""
    try:
        relative = path.relative_to(src_root)
    except ValueError:
        return None

    parts = relative.parts
    if "domain" in parts:
        return "domain"
    if "application" in parts:
        return "application"
    if "infrastructure" in parts:
        return "infrastructure"
    return None


def check_import(
    layer: str,
    module: str,
    file: Path,
    line: int,
) -> Violation | None:
    """Check if import violates layer rules."""
    if layer == "domain":
        if "application" in module or "infrastructure" in module:
            return Violation(
                file=file,
                line=line,
                imported=module,
                reason="Domain cannot import from outer layers",
            )

    if layer == "application":
        if "infrastructure" in module:
            return Violation(
                file=file,
                line=line,
                imported=module,
                reason="Application cannot import from infrastructure",
            )

    return None


def analyze_file(file: Path, src_root: Path) -> list[Violation]:
    """Analyze a single file for violations."""
    violations: list[Violation] = []

    layer = get_layer(file, src_root)
    if layer is None:
        return violations

    try:
        content = file.read_text()
        tree = ast.parse(content)
    except (SyntaxError, UnicodeDecodeError):
        return violations

    for node in ast.walk(tree):
        module: str | None = None

        if isinstance(node, ast.ImportFrom) and node.module:
            module = node.module
        elif isinstance(node, ast.Import):
            module = node.names[0].name

        if module:
            violation = check_import(layer, module, file, node.lineno)
            if violation:
                violations.append(violation)

    return violations


def analyze_directory(src_dir: Path) -> list[Violation]:
    """Analyze all Python files in directory."""
    violations: list[Violation] = []

    for py_file in src_dir.rglob("*.py"):
        violations.extend(analyze_file(py_file, src_dir))

    return violations


def main() -> int:
    """Entry point."""
    src_dir = Path("src")

    # Parse args
    if "--src" in sys.argv:
        idx = sys.argv.index("--src")
        if idx + 1 < len(sys.argv):
            src_dir = Path(sys.argv[idx + 1])

    if not src_dir.exists():
        print(f"Error: {src_dir}/ not found")
        return 1

    violations = analyze_directory(src_dir)

    if violations:
        print(f"❌ Found {len(violations)} dependency violation(s):\n")
        for v in violations:
            print(f"{v.file}:{v.line}")
            print(f"  Import: {v.imported}")
            print(f"  Reason: {v.reason}\n")
        return 1

    print("✅ No dependency violations found")
    return 0


if __name__ == "__main__":
    sys.exit(main())
