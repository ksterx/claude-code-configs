# Codex Technical Review Protocol

## Purpose

Codex serves as the **technical rigor gate** for SDD documents and post-implementation code.
Claude validates all Codex findings before applying them.

## When to Use

| Timing | Target |
|--------|--------|
| **Pre-approval** | spec.md, plan.md, tasks.md (after subagent review) |
| **Post-implementation** | Changed source files (after tests pass + subagent review) |

## Execution Model: Async with Fallback

Codex MCP is unreliable (sometimes unresponsive). Always execute asynchronously.

```
1. Check: is mcp__codex__codex available?
   NO  → Immediately fall back to Claude subagent (code-reviewer, quality mode)
   YES → Call asynchronously

2. Wait up to 30 seconds for response
   TIMEOUT → Fall back to Claude subagent (code-reviewer, quality mode)
   RESPONSE → Proceed to validation

3. If Codex responded:
   → Claude validates each finding (see Review Execution below)
   → Apply validated fixes
```

Codex is best-effort. Never block on it. The fallback ensures review always completes.

---

## Review Execution

### Pre-Approval Review (SDD Documents)

```
1. CALL: mcp__codex__codex
   Prompt:
   "Review the following [spec/plan/tasks] document for technical soundness.

   ## Check Items
   - Concerns: Are there risks, ambiguities, or potential issues not addressed?
   - Technical Debt: Does this design introduce shortcuts that will need rework?
   - Overlooked Considerations: Missing edge cases, error scenarios, or dependencies?
   - Spec Violations: Does this contradict or deviate from the spec requirements?
   - Development Principles:
     - DRY: Unnecessary duplication in the design?
     - Clean Architecture: Proper separation of concerns, dependency direction?
     - SOLID: SRP, OCP, LSP, ISP, DIP compliance?

   ## Library Exception
   If the target is a library or utility module, relax SOLID principles.
   Instead verify it follows idiomatic library patterns:
   - Clear public API surface
   - Minimal dependencies
   - Composable and predictable behavior
   - Conventional patterns for the language/ecosystem

   ## Verdict
   - PASS: Technically sound, no concerns
   - CONDITIONAL: Minor issues, note but don't block
   - FAIL: Significant concerns that must be addressed

   For each issue: Severity, Location, Issue, Recommendation.

   Document:
   [Condensed summary of the SDD document]"

2. CLAUDE VALIDATES each Codex finding:

   FOR EACH finding:
   - Is it factually correct given the project context? → If no, reject
   - Is it a real technical concern or speculative? → Reject speculative
   - Does the recommendation improve the design? → If marginal, reject
   - Does it apply the right principles? (SOLID for app code, library patterns for libs) → Reject misapplied
   - Note: "[Validated: description]" or "[Rejected: reason]"

3. Apply validated fixes before presenting to human
```

### Post-Implementation Review (Source Code)

```
1. CALL: mcp__codex__codex
   Prompt:
   "Review the following implementation changes for technical soundness.

   ## Check Items
   - Technical Debt: Shortcuts, magic numbers, hardcoded values, patterns needing rework?
   - Concerns: Security, performance, or correctness risks?
   - Overlooked Considerations: Unhandled edge cases, missing error handling at boundaries?
   - Spec Violations: Does the implementation match the spec and acceptance criteria?
   - Development Principles:
     - DRY: Unnecessary duplication?
     - Clean Architecture: Layers properly separated, dependencies flow correctly?
     - SOLID: Implementation follows SOLID principles?

   ## Library Exception
   For library/utility code: verify idiomatic patterns instead of strict SOLID.
   - Clear exports, minimal coupling, composable API
   - Follow ecosystem conventions (e.g., builder pattern, functional composition)

   ## Verdict
   Same format (PASS / CONDITIONAL / FAIL).

   Spec summary: [condensed spec]
   Plan summary: [condensed plan]
   Implementation summary: [file list + key changes description]"

2. CLAUDE VALIDATES each finding (same criteria as pre-approval)

3. Apply validated fixes, feed results into final review output
```

---

## Privacy Rules

```
NEVER send to Codex:
- Credentials, API keys, secrets
- Personal/sensitive user data
- Full source code files verbatim

ALWAYS:
- Summarize architecture and design decisions
- Describe implementation patterns, not raw code
- Focus on structural and principle-level analysis
```

---

## Principle Application Guide

| Code Type | Principles to Apply |
|-----------|-------------------|
| **Application code** (services, controllers, domain) | DRY, SOLID, Clean Architecture |
| **Library/utility code** (shared modules, helpers, SDKs) | DRY, idiomatic library patterns, clear API surface |
| **Infrastructure code** (config, CI/CD, scripts) | DRY, convention over configuration |
| **Test code** | Clarity over DRY (some duplication acceptable for readability) |
