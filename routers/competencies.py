from fastapi import APIRouter, Depends
from pydantic import BaseModel

from routers.auth import get_current_user


router = APIRouter(
    prefix="/competencies",
    tags=["Competencies"]
)


class Competency(BaseModel):
    name: str
    score: float


@router.post("/")
def create_competency(
    competency: Competency,
    user: dict = Depends(get_current_user)
):
    return {
        "message": "Competency created successfully",
        "competency": competency,
        "user": user
    }

@router.get("/")
def get_competencies(
    user: dict = Depends(get_current_user)
):
    competencies = [
        {
            "id": 1,
            "name": "Python Programming",
            "score": 75
        },
        {
            "id": 2,
            "name": "Data Structures",
            "score": 60
        },
        {
            "id": 3,
            "name": "Database Management",
            "score": 85
        }
    ]

    return {
        "message": "Competencies retrieved successfully",
        "competencies": competencies
    }