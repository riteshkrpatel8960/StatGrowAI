from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

from database import get_db_connection
from utils.auth import create_access_token, verify_token


router = APIRouter(prefix="/auth", tags=["Authentication"])

security = HTTPBearer()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# =========================
# Request Models
# =========================

class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    password: str
    role_id: int
    department_id: int


class LoginUser(BaseModel):
    email: EmailStr
    password: str


# =========================
# Register
# =========================

@router.post("/register")
def register_user(user: RegisterUser):

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Check existing email
        cursor.execute(
            """
            SELECT user_id
            FROM users
            WHERE email = %s
            LIMIT 1
            """,
            (user.email,)
        )

        if cursor.fetchone():
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        # Validate role
        cursor.execute(
            """
            SELECT role_id, role_name
            FROM roles
            WHERE role_id = %s
            LIMIT 1
            """,
            (user.role_id,)
        )

        role = cursor.fetchone()

        if not role:
            raise HTTPException(
                status_code=400,
                detail="Invalid role_id"
            )

        # Validate department
        cursor.execute(
            """
            SELECT department_id, department_name
            FROM departments
            WHERE department_id = %s
            LIMIT 1
            """,
            (user.department_id,)
        )

        department = cursor.fetchone()

        if not department:
            raise HTTPException(
                status_code=400,
                detail="Invalid department_id"
            )

        # Hash password
        hashed_password = pwd_context.hash(user.password)

        # Insert user
        cursor.execute(
            """
            INSERT INTO users
            (
                name,
                email,
                password_hash,
                role_id,
                department_id
            )
            VALUES (%s, %s, %s, %s, %s)
            """,
            (
                user.name,
                user.email,
                hashed_password,
                user.role_id,
                user.department_id
            )
        )

        connection.commit()

        new_user_id = cursor.lastrowid

        return {
            "message": "User registered successfully",
            "user": {
                "user_id": new_user_id,
                "name": user.name,
                "email": user.email,
                "role_id": user.role_id,
                "role": role["role_name"],
                "department_id": user.department_id,
                "department": department["department_name"]
            }
        }

    except HTTPException:
        raise

    except Exception as e:
        if connection:
            connection.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================
# Login
# =========================

@router.post("/login")
def login_user(user: LoginUser):

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                u.user_id,
                u.name,
                u.email,
                u.password_hash,
                u.role_id,
                r.role_name,
                u.department_id,
                d.department_name
            FROM users u
            LEFT JOIN roles r
                ON u.role_id = r.role_id
            LEFT JOIN departments d
                ON u.department_id = d.department_id
            WHERE u.email = %s
            LIMIT 1
            """,
            (user.email,)
        )

        db_user = cursor.fetchone()

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        # Verify password
        if not pwd_context.verify(
            user.password,
            db_user["password_hash"]
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        # JWT
        token = create_access_token(
            {
                "user_id": db_user["user_id"],
                "email": db_user["email"],
                "role_id": db_user["role_id"],
                "role": db_user["role_name"]
            }
        )

        return {
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "user_id": db_user["user_id"],
                "name": db_user["name"],
                "email": db_user["email"],
                "role_id": db_user["role_id"],
                "role": db_user["role_name"],
                "department_id": db_user["department_id"],
                "department": db_user["department_name"]
            }
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Login failed: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================
# Current User
# =========================

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    return verify_token(credentials.credentials)


@router.get("/me")
def get_me(
    user: dict = Depends(get_current_user)
):
    return {
        "message": "Authenticated user",
        "user": user
    }


# =========================
# Admin Test
# =========================

@router.get("/admin-test")
def admin_test(
    user: dict = Depends(get_current_user)
):
    raise HTTPException(
        status_code=403,
        detail="Admin role is not configured in the current database"
    )