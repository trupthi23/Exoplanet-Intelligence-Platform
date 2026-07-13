from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

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
