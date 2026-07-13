from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.dependencies import get_db
from app.services.analytics_service import *

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

## Summary API
@router.get("/summary")
def summary(
    db: Session = Depends(get_db)
):
    return get_summary(db)

## Discovery Method API
@router.get("/discovery-methods")
def methods(
    db: Session = Depends(get_db)
):
    return discovery_methods(db)

## Discovery Timeline API 
@router.get("/discovery-years")
def years(
    db: Session = Depends(get_db)
):
    return discovery_years(db)

## Top Host Stars 
@router.get("/top-host-stars")
def stars(
    db: Session = Depends(get_db)
):
    return top_host_stars(db)

## Earth-like Candidates 
@router.get("/earth-like")
def earth(
    db: Session = Depends(get_db)
):
    return earth_like_planets(db)

## API 1 – Discovery Timeline
@router.get("/discovery-timeline")
def discovery_timeline(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT discovery_year, COUNT(*) AS planets
        FROM planets
        GROUP BY discovery_year
        ORDER BY discovery_year;
    """))

    return [
        {
            "year": row.discovery_year,
            "planets": row.planets
        }
        for row in result
    ]

## API 2 – Discovery Methods
@router.get("/discovery-methods")
def discovery_methods(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT discovery_method,
               COUNT(*) AS total
        FROM planets
        GROUP BY discovery_method
        ORDER BY total DESC;
    """))

    return [
        {
            "method": row.discovery_method,
            "count": row.total
        }
        for row in result
    ]

## API 3 – Top Host Stars
@router.get("/top-host-stars")
def top_host_stars(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT host_star,
               COUNT(*) AS planets
        FROM planets
        GROUP BY host_star
        ORDER BY planets DESC
        LIMIT 10;
    """))

    return [
        {
            "star": row.host_star,
            "planets": row.planets
        }
        for row in result
    ]