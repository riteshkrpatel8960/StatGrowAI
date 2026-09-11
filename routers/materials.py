from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from database import get_db_connection
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
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

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

        cursor.execute(
            """
            INSERT INTO learning_materials
            (title, description, material_type)
            VALUES (%s, %s, %s)
            """,
            (
                material.title,
                material.description,
                material.material_type
            )
        )

        connection.commit()

        material_id = cursor.lastrowid

        return {
            "message": "Learning material created successfully",
            "material": {
                "id": material_id,
                "title": material.title,
                "description": material.description,
                "material_type": material.material_type
            },
            "created_by": db_user
        }

    except HTTPException:
        raise

    except Exception as e:
        if connection:
            connection.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to create learning material: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


@router.get("/")
def get_materials(
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
                id,
                title,
                description,
                material_type
            FROM learning_materials
            ORDER BY id DESC
            """
        )

        materials = cursor.fetchall()

        return {
            "message": "Learning materials retrieved successfully",
            "materials": materials
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve learning materials: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


@router.get("/{material_id}")
def get_material(
    material_id: int,
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
                id,
                title,
                description,
                material_type
            FROM learning_materials
            WHERE id = %s
            """,
            (material_id,)
        )

        material = cursor.fetchone()

        if not material:
            raise HTTPException(
                status_code=404,
                detail="Learning material not found"
            )

        return {
            "message": "Learning material retrieved successfully",
            "material": material
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve learning material: {str(e)}"
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()