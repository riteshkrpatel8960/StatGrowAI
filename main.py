from database import get_db_connection
from fastapi import FastAPI
from pydantic import BaseModel
from routers.auth import router as auth_router
from routers.users import router as users_router
from routers.materials import router as materials_router
from routers.quizzes import router as quizzes_router
from routers.assessments import router as assessments_router
from routers.competencies import router as competencies_router
from routers.recommendations import router as recommendations_router
from routers.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(materials_router)
app.include_router(quizzes_router)
app.include_router(assessments_router)
app.include_router(competencies_router)
app.include_router(recommendations_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {"message": "Backend is working!"}


@app.get("/hello")
def hello():
    return {"message": "Hello from Backend"}


class User(BaseModel):
    name: str
    email: str
    role: str


@app.post("/users")
def create_user(user: User):
    return {
        "message": "User created successfully",
        "user": user
    }

@app.get("/test-db")
def test_db():
    try:
        connection = get_db_connection()

        if connection.is_connected():
            connection.close()
            return {"message": "Database connected successfully!"}

    except Exception as e:
        return {"error": str(e)}