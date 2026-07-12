from fastapi import FastAPI

app = FastAPI(
    title="Exoplanet Intelligence Platform",
    version="1.0.0",
    description="NASA Exoplanet Discovery & Habitability Intelligence Platform"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Exoplanet Intelligence Platform",
        "status": "Backend Running Successfully 🚀"
    }