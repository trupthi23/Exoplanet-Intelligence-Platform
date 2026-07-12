from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.schemas.planet import PlanetResponse
from app.services.planet_service import (
    get_all_planets,
    get_planet_by_name,
    search_planets,
)

router = APIRouter(
    prefix="/planets",
    tags=["Planets"],
)


@router.get("/", response_model=list[PlanetResponse])
def read_planets(db: Session = Depends(get_db)):
    return get_all_planets(db)


@router.get("/search/", response_model=list[PlanetResponse])
def search(
    keyword: str = Query(...),
    db: Session = Depends(get_db),
):
    return search_planets(db, keyword)


@router.get("/{planet_name}", response_model=PlanetResponse)
def read_planet(
    planet_name: str,
    db: Session = Depends(get_db),
):

    planet = get_planet_by_name(db, planet_name)

    if planet is None:
        raise HTTPException(
            status_code=404,
            detail="Planet not found"
        )

    return planet