from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from database import get_db_connection
from routers.auth import get_current_user


router = APIRouter(
    prefix="/quizzes",
    tags=["Quizzes"]
)


class QuizAnswer(BaseModel):
    question_id: int
    answer: str


class QuizSubmission(BaseModel):
    answers: list[QuizAnswer]


@router.get("/")
def get_quizzes(
    user: dict = Depends(get_current_user)
):
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT id, title, description, difficulty
            FROM quizzes
            ORDER BY id
            """
        )

        quizzes = cursor.fetchall()

        return {
            "message": "Quizzes retrieved successfully",
            "quizzes": quizzes
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve quizzes: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


@router.get("/{quiz_id}")
def get_quiz(
    quiz_id: int,
    user: dict = Depends(get_current_user)
):
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT id, title, description, difficulty
            FROM quizzes
            WHERE id = %s
            """,
            (quiz_id,)
        )

        quiz = cursor.fetchone()

        if not quiz:
            raise HTTPException(
                status_code=404,
                detail="Quiz not found"
            )

        return {
            "message": "Quiz retrieved successfully",
            "quiz": quiz
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve quiz: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


@router.get("/{quiz_id}/questions")
def get_quiz_questions(
    quiz_id: int,
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
                q.id,
                q.question_text
            FROM questions q
            WHERE q.quiz_id = %s
            ORDER BY q.id
            """,
            (quiz_id,)
        )

        questions = cursor.fetchall()

        for question in questions:

            cursor.execute(
                """
                SELECT
                    id,
                    option_label,
                    option_text
                FROM question_options
                WHERE question_id = %s
                ORDER BY id
                """,
                (question["id"],)
            )

            question["options"] = cursor.fetchall()

        return {
            "message": "Quiz questions retrieved successfully",
            "quiz_id": quiz_id,
            "questions": questions
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve quiz questions: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


@router.post("/{quiz_id}/submit")
def submit_quiz(
    quiz_id: int,
    submission: QuizSubmission,
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
                q.id,
                qo.option_label AS correct_answer
            FROM questions q
            JOIN question_options qo
                ON q.id = qo.question_id
            WHERE q.quiz_id = %s
              AND qo.is_correct = 1
            """,
            (quiz_id,)
        )

        correct_answers = cursor.fetchall()

        answer_map = {
            item["id"]: item["correct_answer"]
            for item in correct_answers
        }

        score = 0

        for answer in submission.answers:
            if answer_map.get(answer.question_id) == answer.answer:
                score += 1

        total = len(answer_map)

        percentage = 0

        if total > 0:
            percentage = (score / total) * 100

        return {
            "message": "Quiz submitted successfully",
            "quiz_id": quiz_id,
            "score": score,
            "total": total,
            "percentage": percentage,
            "submitted_by": user
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit quiz: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()