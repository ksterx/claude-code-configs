# Codex Prompt Checklist

Use before sending prompts to Codex.

## Required Elements

- [ ] **Background**: Context about current task
- [ ] **Purpose**: What needs to be achieved
- [ ] **Constraints**: Technical requirements
- [ ] **Task**: Specific actions to perform

## Constraints Block (Copy-paste)

```
Constraints:
- Python 3.13+ type hints (str | None, list[str], type[T] syntax)
- Clean Architecture (Domain → Application → Infrastructure)
- SOLID principles
- Async with anyio (if needed)
```

## Phase-Specific

### Phase 1: Analysis
- [ ] Specify what to investigate
- [ ] List patterns to identify
- [ ] Request structured output

### Phase 2: Design
- [ ] Clarify "interfaces only, no implementation"
- [ ] Reference existing patterns to follow
- [ ] Specify file locations

### Phase 3: TDD
- [ ] Red: Specify test file location and patterns
- [ ] Green: Reference failing tests
- [ ] Refactor: Specify what to improve

## Anti-Patterns

- ❌ Vague task descriptions
- ❌ Missing constraints
- ❌ No context about existing code
- ❌ Asking for implementation before design
