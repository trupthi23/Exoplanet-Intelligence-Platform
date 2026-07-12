from pydantic import BaseModel


class PlanetResponse(BaseModel):

    id: int
    planet_name: str | None = None
    host_star: str | None = None
    discovery_method: str | None = None
    discovery_year: int | None = None
    orbital_period_days: float | None = None
    planet_radius_earth: float | None = None
    planet_mass_earth: float | None = None
    equilibrium_temperature: float | None = None
    star_temperature: float | None = None
    star_radius: float | None = None
    star_mass: float | None = None
    distance_pc: float | None = None
    right_ascension: float | None = None
    declination: float | None = None

    class Config:
        from_attributes = True