from fastapi import APIRouter, Depends
from pydantic import BaseModel

from routers.auth import get_current_user


router = APIRouter(
    prefix="/quizzes",
    tags=["Quizzes"]
)


class Quiz(BaseModel):
    title: str
    description: str
    difficulty: str


@router.post("/")
def create_quiz(
    quiz: Quiz,
    user: dict = Depends(get_current_user)
):
    return {
        "message": "Quiz created successfully",
        "quiz": quiz,
        "created_by": user
    }


@router.get("/")
def get_quizzes(
    user: dict = Depends(get_current_user)
):
    quizzes = [
        {
            "id": 1,
            "title": "Python Basics Quiz",
            "description": "Test your Python fundamentals",
            "difficulty": "easy"
        },
        {
            "id": 2,
            "title": "Data Structures Quiz",
            "description": "Test your knowledge of arrays and linked lists",
            "difficulty": "medium"
        }
    ]

    return {
        "message": "Quizzes retrieved successfully",
        "quizzes": quizzes
    }


@router.get("/{quiz_id}")
def get_quiz(
    quiz_id: int,
    user: dict = Depends(get_current_user)
):
    quizzes = [
        {
            "id": 1,
            "title": "Python Basics Quiz",
            "description": "Test your Python fundamentals",
            "difficulty": "easy"
        },
        {
            "id": 2,
            "title": "Data Structures Quiz",
            "description": "Test your knowledge of arrays and linked lists",
            "difficulty": "medium"
        }
    ]

    for quiz in quizzes:
        if quiz["id"] == quiz_id:
            return {
                "message": "Quiz retrieved successfully",
                "quiz": quiz
            }

    return {
        "message": "Quiz not found"
    }

class QuizAnswer(BaseModel):
    question_id: int
    answer: str


class QuizSubmission(BaseModel):
    answers: list[QuizAnswer]


@router.post("/{quiz_id}/submit")
def submit_quiz(
    quiz_id: int,
    submission: QuizSubmission,
    user: dict = Depends(get_current_user)
):
    correct_answers = {
        1: "B",
        2: "A",
        3: "C",
        4: "B",
        5: "A"
    }

    score = 0

    for answer in submission.answers:
        if correct_answers.get(answer.question_id) == answer.answer:
            score += 1

    total = len(correct_answers)
    percentage = (score / total) * 100

    return {
        "message": "Quiz submitted successfully",
        "quiz_id": quiz_id,
        "score": score,
        "total": total,
        "percentage": percentage,
        "submitted_by": user
    }