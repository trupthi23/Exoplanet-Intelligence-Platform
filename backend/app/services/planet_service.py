from sqlalchemy.orm import Session
from app.models.planet import Planet

def get_all_planets(db: Session):

    return db.query(Planet).limit(100).all()

def get_planet_by_name(db: Session, planet_name: str):

    return (
        db.query(Planet)
        .filter(Planet.planet_name == planet_name)
        .first()
    )
def search_planets(db: Session, keyword: str):
    return (
        db.query(Planet)
        .filter(
            Planet.planet_name.ilike(f"%{keyword}%")
        )
        .limit(20)
        .all()
    )
