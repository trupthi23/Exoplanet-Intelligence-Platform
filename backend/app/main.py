from fastapi import FastAPI

from app.api import test_api

app = FastAPI(
    title="Exoplanet Intelligence Platform",
    version="1.0"
)

app.include_router(test_api.router)


@app.get("/")
def home():

    return {

        "message": "Welcome to Exoplanet Intelligence Platform"

    }
from app.api import planet_api

app.include_router(planet_api.router)