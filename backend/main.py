from fastapi import FastAPI
from pydantic import BaseModel

from backend.ai.competency import analyze_competencies
from backend.ai.recommendation import get_recommendations, analyze_progress
from backend.data.competency_history import add_score


app = FastAPI(
    title="SIH Competency AI",
    description="Competency Gap Analysis and Personalized Recommendation System"
)


class EmployeeData(BaseModel):

    name: str
    role: str
    competencies: dict[str, float]


@app.get("/")
def home():

    return {
        "message": "SIH Competency AI is running"
    }


@app.post("/analyze")
def analyze_employee(employee: EmployeeData):

    competency_result = analyze_competencies(
        employee.competencies
    )

    recommendations = get_recommendations(
        competency_result
    )

    for skill, data in competency_result.items():

        add_score(
            employee.name,
            skill,
            data["score"]
        )

    return {

        "employee": {
            "name": employee.name,
            "role": employee.role
        },

        "competency_analysis": competency_result,

        "personalized_recommendations": recommendations

    }