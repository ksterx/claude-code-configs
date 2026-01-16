# CLAUDE.md - Global Configuration

## Core Principles

1. **Autonomous Operation** - Proceed automatically, no status reports
2. **Lightweight Orchestration** - Delegate to subagents, preserve main context
3. **Role Delegation** - Complex (3+ files) → Codex, Simple (1-2 files) → Expert subagent
4. **Auto-Routing** - Automatically select /feat or /patch based on scope
5. **Profile Awareness** - Detect and display project profile at task start
6. **Risk-Based Review** - /feat → 3 parallel reviewers, /patch → single Claude subagent
7. **Validate Reviews** - Never accept review without validation
8. **Confidence Filtering** - Only report issues with ≥80% confidence

> **Details**: See `skills/dev-workflow-core/SKILL.md` for workflow tracks, agent roles, and review modes.

---

## Auto-Routing

Automatic track selection on task receipt:

```
if is_exploration(task):       → /explore
elif estimated_files <= 2:     → /patch
else:                          → /feat
```

Display profile and confirm with user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Profile: clean-arch
├─ Structure: domain/ → application/ → infra/
├─ Rules: Dependencies flow inward only
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Track: /feat (3+ files expected)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Subagent Delegation

Delegate implementation and investigation to subagents to preserve main context.

### Investigation

Use the **general-purpose** subagent with analyst role:

> "Investigate {target} using Codex and Gemini. Answer: {questions}. Output an Investigation Report."

See `agents/analyst.md` for output format.

### Implementation

**Complex (3+ files)**: Use **general-purpose** subagent with implementer role:

> "Implement {task} following {profile} profile rules. Use Codex MCP. Follow TDD."

**Simple (1-2 files)**: Use **python-expert** or **typescript-expert** subagent:

> "Implement {task} following {profile} profile. TDD required."

See `agents/implementer.md` for details.

### Review (3 Parallel)

Launch 3 subagents simultaneously with different focuses:

1. **Simplicity Focus**: "Review for DRY violations, complexity, over-engineering"
2. **Correctness Focus**: "Review for logic errors, edge cases, error handling gaps"
3. **Conventions Focus**: "Review for pattern violations, style inconsistencies"

See `agents/reviewer.md` for full prompts.

---

## Review Rules

### /feat (Parallel Review)

```
1. Gather context (tech stack, patterns, related code)
2. Implementation complete
3. Launch 3 reviewer subagents in parallel
4. Aggregate results (confidence ≥80% only)
5. Validate each concern before acting
6. Present to user: [Fix now] [Fix later] [Proceed]
7. Repeat if needed (max 3 iterations)
```

**Context is mandatory**: See `skills/*/workflow/gemini-templates.md`

### /patch (Light Review)

```
1. Single reviewer subagent (quality-engineer)
2. Scope check: ≤2 files
3. APPROVED → commit, NEEDS_FIX → fix, ESCALATE → /feat
```

### Validation Process (CRITICAL)

```
For each review concern:
  - Technically accurate? → If no, false positive
  - Applies to this project? → If no, irrelevant
  - Severity correct? → Adjust if needed
  - Conflicts with existing patterns? → Follow project conventions

Result:
  - ACCEPTED: All valid → Apply all
  - ADJUSTED: Some invalid → Apply valid only
  - REJECTED: Most invalid → Re-review with more context
```

> **Details**: See `skills/dev-workflow-core/workflow/review-validation.md`

### Result Aggregation

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Review Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Simplicity:   2 issues
Correctness:  1 issue
Conventions:  0 issues
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 3 high-confidence issues

[1] src/domain/user.py:45 - Duplicate validation
[2] src/domain/user.py:78 - Missing null check
[3] src/api/handler.py:23 - Redundant try-catch

Action: [Fix now] [Fix later] [Proceed as-is]
```

### Escalation Triggers

- 3 iterations without APPROVED
- Scope exceeds 2 files in /patch
- Security concerns
- Architectural impact detected

---

## Human Intervention

**Required**: Intent confirmation (/feat), strategic decisions, 3 iterations exceeded, security

**Not Required**: Phase transitions, routine commits/PRs, /patch completion

---

## Diagram Guidelines

- **Use mermaid** for all diagrams (flowcharts, sequence, class, ER, etc.)
- **Exceptions** (use ASCII/text):
  - Directory trees (`├──`, `└──`)
  - UI mockups / wireframes
  - Simple tables (markdown table is fine)

---

## Forbidden

- Execute implementation directly (delegate to subagent)
- Skip profile display at task start
- Run reviews sequentially (use parallel)
- Report low-confidence issues (<80%)
- Include code in Codex prompts
- Skip review entirely (light review for /patch is required)
- Create docs without human approval
- Accept review without validation
- Use /patch for 3+ file changes
- **Call Gemini without project context** (tech stack, patterns, conventions)
