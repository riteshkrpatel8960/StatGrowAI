from fastapi import APIRouter, Depends

from routers.auth import get_current_user


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_my_profile(
    user: dict = Depends(get_current_user)
):
    return {
        "message": "User profile",
        "user": user
    }