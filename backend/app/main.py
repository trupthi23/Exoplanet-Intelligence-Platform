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

# CORS Configuration

origins = [
    # Local Development
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    # Vite Preview
    "http://localhost:4173",
    "http://127.0.0.1:4173",

    # Production (Vercel)
    "https://exoplanet-intelligence-platform.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers

app.include_router(health.router)
app.include_router(planets.router)
app.include_router(analytics.router)

# Root Endpoint

@app.get("/")
def home():
    return {
        "message": "Welcome to Exoplanet Intelligence Platform",
        "status": "Running"
    }