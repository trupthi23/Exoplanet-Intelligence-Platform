from fastapi import FastAPI

from app.api import health
from app.api import planets

app = FastAPI(
    title="Exoplanet Intelligence Platform",
    version="1.0.0",
    description="NASA Exoplanet Discovery & Habitability Intelligence Platform"
)

app.include_router(health.router)
app.include_router(planets.router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Exoplanet Intelligence Platform"
    }