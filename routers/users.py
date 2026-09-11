from fastapi import APIRouter, Depends, HTTPException

from database import get_db_connection
from routers.auth import get_current_user


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_my_profile(
    user: dict = Depends(get_current_user)
):

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
                u.role_id,
                r.role_name,
                u.department_id,
                d.department_name,
                u.created_at
            FROM users u

            LEFT JOIN roles r
                ON u.role_id = r.role_id

            LEFT JOIN departments d
                ON u.department_id = d.department_id

            WHERE u.user_id = %s

            LIMIT 1
            """,
            (user["user_id"],)
        )

        db_user = cursor.fetchone()

        if not db_user:

            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        return {
            "message": "User profile retrieved successfully",
            "user": db_user
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve user profile: {str(e)}"
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()