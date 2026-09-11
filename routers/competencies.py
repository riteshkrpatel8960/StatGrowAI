from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from database import get_db_connection
from routers.auth import get_current_user


router = APIRouter(
    prefix="/competencies",
    tags=["Competencies"]
)


class Competency(BaseModel):
    name: str
    score: float


@router.get("/")
def get_competencies(
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
                uc.competency_id AS id,
                c.name AS name,
                uc.score AS score
            FROM user_competencies uc
            JOIN competencies c
                ON uc.competency_id = c.id
            JOIN users u
                ON uc.user_id = u.id
            WHERE u.email = %s
            ORDER BY c.name
            """,
            (user["email"],)
        )

        competencies = cursor.fetchall()

        return {
            "message": "Competencies retrieved successfully",
            "competencies": competencies
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve competencies: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()