from fastapi import APIRouter, Depends
from pydantic import BaseModel

from routers.auth import get_current_user


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


class Recommendation(BaseModel):
    competency: str
    resource_title: str
    resource_type: str
    reason: str


@router.post("/")
def create_recommendation(
    recommendation: Recommendation,
    user: dict = Depends(get_current_user)
):
    return {
        "message": "Recommendation created successfully",
        "recommendation": recommendation,
        "recommended_for": user
    }

@router.get("/")
def get_recommendations(
    user: dict = Depends(get_current_user)
):
    recommendations = [
        {
            "id": 1,
            "competency": "Data Structures",
            "resource_title": "Data Structures Basics",
            "resource_type": "PDF",
            "reason": "Improve your Data Structures competency."
        },
        {
            "id": 2,
            "competency": "Python Programming",
            "resource_title": "Python Advanced Concepts",
            "resource_type": "PPT",
            "reason": "Improve your Python programming skills."
        }
    ]

    return {
        "message": "Recommendations retrieved successfully",
        "recommendations": recommendations
    }
