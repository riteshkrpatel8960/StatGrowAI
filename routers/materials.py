from fastapi import APIRouter, Depends
from pydantic import BaseModel

from routers.auth import get_current_user


router = APIRouter(
    prefix="/materials",
    tags=["Learning Materials"]
)


class Material(BaseModel):
    title: str
    description: str
    material_type: str


@router.post("/")
def create_material(
    material: Material,
    user: dict = Depends(get_current_user)
):
    return {
        "message": "Learning material created successfully",
        "material": material,
        "created_by": user
    }


@router.get("/")
def get_materials(
    user: dict = Depends(get_current_user)
):
    materials = [
        {
            "id": 1,
            "title": "Python Basics",
            "description": "Introduction to Python programming",
            "material_type": "PDF"
        },
        {
            "id": 2,
            "title": "Data Structures",
            "description": "Introduction to arrays and linked lists",
            "material_type": "PPT"
        }
    ]

    return {
        "message": "Learning materials retrieved successfully",
        "materials": materials
    }


@router.get("/{material_id}")
def get_material(
    material_id: int,
    user: dict = Depends(get_current_user)
):
    materials = [
        {
            "id": 1,
            "title": "Python Basics",
            "description": "Introduction to Python programming",
            "material_type": "PDF"
        },
        {
            "id": 2,
            "title": "Data Structures",
            "description": "Introduction to arrays and linked lists",
            "material_type": "PPT"
        }
    ]

    for material in materials:
        if material["id"] == material_id:
            return {
                "message": "Learning material retrieved successfully",
                "material": material
            }

    return {
        "message": "Learning material not found"
    }