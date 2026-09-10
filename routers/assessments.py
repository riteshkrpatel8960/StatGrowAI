from fastapi import APIRouter, Depends
from pydantic import BaseModel

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
    return {
        "message": "Assessment submitted successfully",
        "assessment": assessment,
        "submitted_by": user
    }
@router.get("/")
def get_assessments(
    user: dict = Depends(get_current_user)
):
    assessments = [
        {
            "id": 1,
            "quiz_id": 1,
            "score": 5,
            "total": 5,
            "percentage": 100
        },
        {
            "id": 2,
            "quiz_id": 2,
            "score": 7,
            "total": 10,
            "percentage": 70
        }
    ]

    return {
        "message": "Assessments retrieved successfully",
        "assessments": assessments
    }