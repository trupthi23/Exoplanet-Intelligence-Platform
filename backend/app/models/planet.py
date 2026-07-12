from sqlalchemy import Column
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import String

from app.database import Base


class Planet(Base):

    __tablename__ = "planets"

    id = Column(Integer, primary_key=True, index=True)

    planet_name = Column(String)

    host_star = Column(String)

    discovery_method = Column(String)

    discovery_year = Column(Integer)

    orbital_period_days = Column(Float)

    planet_radius_earth = Column(Float)

    planet_mass_earth = Column(Float)

    equilibrium_temperature = Column(Float)

    star_temperature = Column(Float)

    star_radius = Column(Float)

    star_mass = Column(Float)

    distance_pc = Column(Float)

    right_ascension = Column(Float)

    declination = Column(Float)