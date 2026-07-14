from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_db
from app.ml.similarity import get_similar_planets

router = APIRouter(
    prefix="/planets",
    tags=["Planets"]
)

# Get All Planets

@router.get("")
def get_all_planets(
    db: Session = Depends(get_db)
):

    result = db.execute(
        text("""
            SELECT *
            FROM planets
            LIMIT 100
        """)
    )

    return [
        dict(row._mapping)
        for row in result
    ]


# Search Planets

@router.get("/search")
def search_planets(
    name: str = "",
    method: str = "",
    year: int | None = None,
    db: Session = Depends(get_db)
):

    query = """
        SELECT *
        FROM planets
        WHERE LOWER(planet_name) LIKE LOWER(:name)
    """

    params = {
        "name": f"%{name}%"
    }

    if method:
        query += " AND discovery_method = :method"
        params["method"] = method

    if year:
        query += " AND discovery_year = :year"
        params["year"] = year

    query += " LIMIT 50"

    result = db.execute(
        text(query),
        params
    )

    return [
        dict(row._mapping)
        for row in result
    ]


# Similar Planet Recommendations (ML)

@router.get("/{planet_id}/similar")
def similar_planets(
    planet_id: int
):

    return get_similar_planets(planet_id)


# Get Planet By ID

@router.get("/{planet_id}")
def get_planet(
    planet_id: int,
    db: Session = Depends(get_db)
):

    result = db.execute(
        text("""
            SELECT *
            FROM planets
            WHERE id = :id
        """),
        {
            "id": planet_id
        }
    ).fetchone()

    if result is None:
        return {
            "error": "Planet not found"
        }

    return dict(result._mapping)