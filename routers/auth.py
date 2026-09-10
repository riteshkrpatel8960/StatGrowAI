from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from passlib.context import CryptContext

from utils.auth import create_access_token, verify_token, require_role


security = HTTPBearer()

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class RegisterUser(BaseModel):
    name: str
    email: str
    password: str
    role: str


@router.post("/register")
def register_user(user: RegisterUser):

    hashed_password = pwd_context.hash(user.password)

    return {
        "message": "User registered successfully",
        "user": {
            "name": user.name,
            "email": user.email,
            "role": user.role
        },
        "password_hashed": True
    }


class LoginUser(BaseModel):
    email: str
    password: str


@router.post("/login")
def login_user(user: LoginUser):

    # Temporary user for testing
    stored_email = "prabhat@gmail.com"
    stored_password = "test123"
    stored_role = "employee"

    if user.email != stored_email or user.password != stored_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token({
        "email": user.email,
        "role": stored_role
    })

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer"
    }


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    return verify_token(token)


@router.get("/me")
def get_me(
    user: dict = Depends(get_current_user)
):
    return {
        "message": "Authenticated user",
        "user": user
    }


@router.get("/admin-test")
def admin_test(
    user: dict = Depends(get_current_user)
):
    user = require_role("admin")(user)

    return {
        "message": "Admin access granted",
        "user": user
    }