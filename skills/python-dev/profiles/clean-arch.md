# Clean Architecture Profile

## Markers

- `app/domain`, `app/use_cases`, `app/infra`

## Principles

- Enforce dependency rule (domain <- application <- infra)
- Use Cases as application services
- Repository pattern for data access
- Domain models independent of frameworks

## Structure

```
src/
├── domain/           # Entities, value objects, domain services
│   └── user/
│       ├── models.py
│       └── services.py
├── application/      # Use cases, DTOs
│   └── use_cases/
│       └── register_user.py
├── infra/           # DB, external services, frameworks
│   ├── persistence/
│   └── external/
└── api/             # HTTP/gRPC handlers
```

## Rules

- `domain/` imports NOTHING from other layers
- `application/` imports only from `domain/`
- `infra/` implements interfaces defined in `domain/`/`application/`
- `api/` is thin, delegates to use cases
