from sqlalchemy import func

from app.models.planet import Planet


def get_summary(db):

    return {
        "total_planets": db.query(Planet).count(),

        "total_host_stars":
        db.query(Planet.host_star).distinct().count(),

        "average_radius":
        db.query(func.avg(Planet.planet_radius_earth)).scalar(),

        "average_star_temperature":
        db.query(func.avg(Planet.star_temperature)).scalar()
    }

 ## Discovery Methods
def discovery_methods(db):

    results = (
        db.query(
            Planet.discovery_method,
            func.count().label("count")
        )
        .group_by(Planet.discovery_method)
        .order_by(func.count().desc())
        .all()
    )

    return [
        {
            "method": r.discovery_method,
            "count": r.count
        }
        for r in results
    ]

## Discovery Timeline
def discovery_years(db):

    results = (
        db.query(
            Planet.discovery_year,
            func.count().label("count")
        )
        .group_by(Planet.discovery_year)
        .order_by(Planet.discovery_year)
        .all()
    )

    return [
        {
            "year": r.discovery_year,
            "count": r.count
        }
        for r in results
    ]

## Top Host Stars
def top_host_stars(db):

    results = (
        db.query(
            Planet.host_star,
            func.count().label("count")
        )
        .group_by(Planet.host_star)
        .order_by(func.count().desc())
        .limit(10)
        .all()
    )

    return [
        {
            "host_star": r.host_star,
            "planets": r.count
        }
        for r in results
    ]

## Earth-like Candidates 
def earth_like_planets(db):

    return (
        db.query(Planet)
        .filter(
            Planet.planet_radius_earth.between(0.8, 1.5),
            Planet.equilibrium_temperature.between(200, 320)
        )
        .limit(20)
        .all()
    )