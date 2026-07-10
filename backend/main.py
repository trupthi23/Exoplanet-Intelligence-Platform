from fastapi import FastAPI
from app.config import PROJECT_NAME, API_VERSION

app = FastAPI(
    title=PROJECT_NAME,
    version=API_VERSION
)

@app.get("/")
def root():
    return {
        "message": "Welcome to the Exoplanet Intelligence Platform API"
    }