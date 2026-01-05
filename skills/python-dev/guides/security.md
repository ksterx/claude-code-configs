# Security Guide (Python)

## Input Validation

### Pydantic Validation

```python
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserInput(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    age: int = Field(ge=0, le=150)

    @field_validator("name")
    @classmethod
    def sanitize_name(cls, v: str) -> str:
        # Remove potentially dangerous characters
        return v.strip()
```

### Path Traversal Prevention

```python
from pathlib import Path

def safe_file_read(base_dir: Path, filename: str) -> str:
    # Resolve to absolute path and verify it's within base_dir
    full_path = (base_dir / filename).resolve()

    if not full_path.is_relative_to(base_dir.resolve()):
        raise ValueError("Path traversal detected")

    return full_path.read_text()
```

## SQL Injection Prevention

### Use ORM/Query Builders

```python
# ✅ SQLAlchemy ORM (safe)
user = session.query(User).filter(User.email == email).first()

# ✅ Parameterized query (safe)
result = session.execute(
    text("SELECT * FROM users WHERE email = :email"),
    {"email": email}
)

# ❌ String interpolation (vulnerable)
result = session.execute(f"SELECT * FROM users WHERE email = '{email}'")
```

## Authentication & Authorization

### Password Hashing

```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
```

### JWT Token Handling

```python
from datetime import datetime, timedelta, timezone
import jwt

def create_token(user_id: str, secret: str, expires_in: int = 3600) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(seconds=expires_in),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, secret, algorithm="HS256")

def verify_token(token: str, secret: str) -> dict:
    return jwt.decode(token, secret, algorithms=["HS256"])
```

## Secrets Management

### Environment Variables

```python
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    api_key: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

# ❌ Never hardcode secrets
# SECRET_KEY = "hardcoded-secret"
```

### Secrets in Logs

```python
import logging

class SecretFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        # Mask sensitive data in log messages
        if hasattr(record, "msg"):
            record.msg = self._mask_secrets(str(record.msg))
        return True

    def _mask_secrets(self, msg: str) -> str:
        # Implement masking logic
        return msg
```

## Dependency Security

### Audit Dependencies

```bash
# Check for vulnerabilities
pip-audit

# Update dependencies
pip install --upgrade package-name

# Lock dependencies
pip freeze > requirements.txt
# or with uv
uv pip compile pyproject.toml -o requirements.lock
```

### Minimal Dependencies

- Only install what you need
- Prefer well-maintained packages
- Check package reputation before adding

## API Security

### Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/api/resource")
@limiter.limit("10/minute")
async def get_resource(request: Request):
    ...
```

### CORS Configuration

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://trusted-domain.com"],  # ❌ Never use ["*"] in production
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization"],
)
```

## Security Checklist

- [ ] All user inputs validated with Pydantic
- [ ] SQL queries use ORM or parameterized queries
- [ ] Passwords hashed with Argon2 or bcrypt
- [ ] JWT tokens have expiration
- [ ] Secrets loaded from environment
- [ ] Dependencies audited for vulnerabilities
- [ ] Rate limiting implemented
- [ ] CORS configured restrictively
- [ ] Sensitive data not logged
