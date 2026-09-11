from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from database import get_db_connection
from routers.auth import get_current_user


router = APIRouter(
    prefix="/assessments",
    tags=["Assessments"]
)


class Assessment(BaseModel):
    quiz_id: int
    score: int
    total: int
    percentage: float


@router.post("/")
def create_assessment(
    assessment: Assessment,
    user: dict = Depends(get_current_user)
):
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Find user
        cursor.execute(
            """
            SELECT id
            FROM users
            WHERE email = %s
            """,
            (user["email"],)
        )

        db_user = cursor.fetchone()

        if not db_user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        # Save assessment
        cursor.execute(
            """
            INSERT INTO assessments
            (user_id, quiz_id, score, total, percentage)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (
                db_user["id"],
                assessment.quiz_id,
                assessment.score,
                assessment.total,
                assessment.percentage
            )
        )

        connection.commit()

        assessment_id = cursor.lastrowid

        return {
            "message": "Assessment submitted successfully",
            "assessment": {
                "id": assessment_id,
                "quiz_id": assessment.quiz_id,
                "score": assessment.score,
                "total": assessment.total,
                "percentage": assessment.percentage
            }
        }

    except HTTPException:
        raise

    except Exception as e:
        if connection:
            connection.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save assessment: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


@router.get("/")
def get_assessments(
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
                a.id,
                a.quiz_id,
                a.score,
                a.total,
                a.percentage
            FROM assessments a
            JOIN users u
                ON a.user_id = u.id
            WHERE u.email = %s
            ORDER BY a.id DESC
            """,
            (user["email"],)
        )

        assessments = cursor.fetchall()

        return {
            "message": "Assessments retrieved successfully",
            "assessments": assessments
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve assessments: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()