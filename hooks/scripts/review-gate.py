#!/usr/bin/env python3
"""
Review Gate Stop Hook
=====================
Blocks completion if auto-dev skill was invoked but code-reviewer subagent
was never launched (indicating the review loop was skipped).

Detection:
  - Reads the session transcript (JSONL) to check for auto-dev invocation
    and code-reviewer subagent launch.
  - Trivial complexity is exempt (no review required).

Protocol:
  - stdout: {"decision": "block", "reason": "..."} to prevent stopping
  - exit 0 always (non-zero would be treated as hook error)
  - stop_hook_active: true → allow stop to prevent infinite loops
"""

import json
import sys
from pathlib import Path


def main():
    try:
        stdin_content = sys.stdin.read().strip()
        if not stdin_content:
            sys.exit(0)

        data = json.loads(stdin_content)

        # Prevent infinite loop: if a Stop hook already blocked once
        # and Claude is trying to stop again, allow it through.
        if data.get("stop_hook_active"):
            sys.exit(0)

        transcript_path = data.get("transcript_path", "")
        if not transcript_path or not Path(transcript_path).exists():
            sys.exit(0)

        # Read full transcript content (JSONL)
        content = Path(transcript_path).read_text(encoding="utf-8", errors="ignore")

        # 1. Check if auto-dev skill was invoked in this session
        autodev_markers = [
            '"skill":"auto-dev"',
            '"skill": "auto-dev"',
        ]
        has_autodev = any(marker in content for marker in autodev_markers)

        if not has_autodev:
            # Not an auto-dev workflow — no gate needed
            sys.exit(0)

        # 2. Check for Trivial complexity (no review required)
        trivial_markers = [
            "Complexity: Trivial",
            "Complexity: [Trivial]",
            "**Complexity**: Trivial",
        ]
        is_trivial = any(marker in content for marker in trivial_markers)

        if is_trivial:
            sys.exit(0)

        # 3. Check if code-reviewer subagent was actually launched
        has_reviewer = (
            '"subagent_type":"code-reviewer"' in content
            or '"subagent_type": "code-reviewer"' in content
            or '"subagent_type" : "code-reviewer"' in content
        )

        # Also accept: reviewer mentioned in review results output
        has_review_results = "## Review Results" in content

        if has_reviewer or has_review_results:
            # Review was executed — allow stop
            sys.exit(0)

        # Auto-dev was invoked, not Trivial, but no reviewer launched — BLOCK
        result = {
            "decision": "block",
            "reason": (
                "auto-dev workflow detected (Simple+ complexity) but code-reviewer "
                "subagent was never launched. You MUST execute the review loop before "
                "completing. Steps: (1) Launch code-reviewer subagent, (2) evaluate "
                "findings, (3) apply valid fixes, (4) include '## Review Results' in "
                "your completion output. See SKILL.md 'Review Gate Rules'."
            ),
        }
        print(json.dumps(result))
        sys.exit(0)

    except Exception:
        # On any error, allow stop to avoid blocking Claude
        sys.exit(0)


if __name__ == "__main__":
    main()
