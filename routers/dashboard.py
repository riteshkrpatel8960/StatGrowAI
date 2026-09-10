from fastapi import APIRouter, Depends

from routers.auth import get_current_user


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    user: dict = Depends(get_current_user)
):
    return {
        "message": "Dashboard data retrieved successfully",
        "user": user,

        "competencies": [
            {
                "name": "Python Programming",
                "score": 75
            },
            {
                "name": "Data Structures",
                "score": 60
            },
            {
                "name": "Database Management",
                "score": 85
            }
        ],

        "assessments": [
            {
                "quiz_id": 1,
                "score": 5,
                "total": 5,
                "percentage": 100
            },
            {
                "quiz_id": 2,
                "score": 7,
                "total": 10,
                "percentage": 70
            }
        ],

        "recommendations": [
            {
                "competency": "Data Structures",
                "resource_title": "Data Structures Basics",
                "resource_type": "PDF"
            },
            {
                "competency": "Python Programming",
                "resource_title": "Python Advanced Concepts",
                "resource_type": "PPT"
            }
        ]
    }