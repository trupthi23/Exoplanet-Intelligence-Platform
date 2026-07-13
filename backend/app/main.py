from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health
from app.api import planets
from app.api import analytics

app = FastAPI(
    title="Exoplanet Intelligence Platform",
    version="1.0.0",
    description="NASA Exoplanet Discovery & Habitability Intelligence Platform"
)

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health.router)
app.include_router(planets.router)
app.include_router(analytics.router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Exoplanet Intelligence Platform"
    }