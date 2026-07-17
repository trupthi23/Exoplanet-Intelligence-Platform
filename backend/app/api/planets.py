from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database import get_db
from app.ml.similarity import get_similar_planets

router = APIRouter(
    prefix="/planets",
    tags=["Planets"]
)


# -----------------------------
# Get All Planets (Pagination)
# -----------------------------

@router.get("")
def get_all_planets(
    page: int = 1,
    limit: int = 50,
    db: Session = Depends(get_db)
):

    if page < 1:
        page = 1

    if limit < 1:
        limit = 50

    if limit > 500:
        limit = 500

    offset = (page - 1) * limit

    total = db.execute(
        text("""
            SELECT COUNT(*)
            FROM planets
        """)
    ).scalar()

    result = db.execute(
        text("""
            SELECT *
            FROM planets
            ORDER BY id
            LIMIT :limit
            OFFSET :offset
        """),
        {
            "limit": limit,
            "offset": offset,
        },
    )

    planets = [
        dict(row._mapping)
        for row in result
    ]

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit,
        "data": planets,
    }


# -----------------------------
# Search Planets
# -----------------------------

@router.get("/search")
def search_planets(
    name: str = "",
    method: str = "",
    year: int | None = None,
    host_star: str = "",
    page: int = 1,
    limit: int = 25,
    sort: str = "planet_name",
    order: str = "asc",
    db: Session = Depends(get_db),
):

    if page < 1:
        page = 1

    if limit < 1:
        limit = 25

    if limit > 100:
        limit = 100

    allowed_sort = {
        "planet_name",
        "discovery_method",
        "discovery_year",
        "host_star",
        "planet_radius_earth",
        "planet_mass_earth",
        "equilibrium_temperature",
        "distance_pc",
    }

    if sort not in allowed_sort:
        sort = "planet_name"

    order = "DESC" if order.lower() == "desc" else "ASC"

    where = []
    params = {}

    if name:
        where.append(
            "LOWER(planet_name) LIKE LOWER(:name)"
        )
        params["name"] = f"%{name}%"

    if method:
        where.append(
            "LOWER(discovery_method)=LOWER(:method)"
        )
        params["method"] = method

    if year:
        where.append(
            "discovery_year=:year"
        )
        params["year"] = year

    if host_star:
        where.append(
            "LOWER(host_star) LIKE LOWER(:host_star)"
        )
        params["host_star"] = f"%{host_star}%"

    where_clause = ""

    if where:
        where_clause = "WHERE " + " AND ".join(where)

    count_query = text(f"""
        SELECT COUNT(*)
        FROM planets
        {where_clause}
    """)

    total = db.execute(
        count_query,
        params,
    ).scalar()

    params["limit"] = limit
    params["offset"] = (page - 1) * limit

    query = text(f"""
        SELECT *
        FROM planets
        {where_clause}
        ORDER BY {sort} {order}
        LIMIT :limit
        OFFSET :offset
    """)

    result = db.execute(
        query,
        params,
    )

    planets = [
        dict(row._mapping)
        for row in result
    ]

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages":
            (total + limit - 1) // limit,
        "data": planets,
    }


# -----------------------------
# Similar Planets
# -----------------------------

@router.get("/{planet_id}/similar")
def similar_planets(
    planet_id: int
):

    return get_similar_planets(planet_id)


# -----------------------------
# Planet By ID
# -----------------------------

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