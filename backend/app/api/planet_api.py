from fastapi import APIRouter

router = APIRouter(
    prefix="/planets",
    tags=["Planets"]
)


@router.get("/")
def get_planets():

    return {

        "message": "Planet API Working"

    }