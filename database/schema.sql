CREATE TABLE planets (

    id SERIAL PRIMARY KEY,

    planet_name TEXT NOT NULL,

    host_star TEXT NOT NULL,

    discovery_method TEXT,

    discovery_year INT,

    orbital_period_days FLOAT,

    planet_radius_earth FLOAT,

    planet_mass_earth FLOAT,

    equilibrium_temperature FLOAT,

    star_temperature FLOAT,

    star_radius FLOAT,

    star_mass FLOAT,

    distance_pc FLOAT,

    right_ascension FLOAT,

    declination FLOAT

);