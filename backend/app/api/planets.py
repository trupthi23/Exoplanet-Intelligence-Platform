from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db

router = APIRouter(prefix="/planets", tags=["Planets"])

@router.get("/search")
def search_planets(
    name: str = "",
    db: Session = Depends(get_db)
):

    result = db.execute(
        text("""

        SELECT *

        FROM planets

        WHERE LOWER(planet_name)

        LIKE LOWER(:search)

        LIMIT 50

        """),

        {
            "search": f"%{name}%"
        }

    )

    return [

        dict(row._mapping)

        for row in result

    ]