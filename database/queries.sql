--Query 1 – Total Exoplanets
SELECT COUNT(*) AS total_planets
FROM planets;

--Query 2 – Total Host Stars
SELECT COUNT(DISTINCT host_star) AS total_host_stars
FROM planets;

--Query 3 – Discovery Methods
SELECT discovery_method,
       COUNT(*) AS planets
FROM planets
GROUP BY discovery_method
ORDER BY planets DESC;

--Query 4 – Discoveries by Year
SELECT discovery_year,
       COUNT(*) AS discoveries
FROM planets
GROUP BY discovery_year
ORDER BY discovery_year;

--Query 5 – Largest Planets
SELECT planet_name,
       planet_radius_earth
FROM planets
WHERE planet_radius_earth IS NOT NULL
ORDER BY planet_radius_earth DESC
LIMIT 10;

--Query 6 – Most Massive Planets
SELECT planet_name,
       planet_mass_earth
FROM planets
WHERE planet_mass_earth IS NOT NULL
ORDER BY planet_mass_earth DESC
LIMIT 10;

--Query 7 – Closest Planets
SELECT planet_name,
       distance_pc
FROM planets
WHERE distance_pc IS NOT NULL
ORDER BY distance_pc
LIMIT 10;

--Query 8 – Hottest Stars
SELECT host_star,
       star_temperature
FROM planets
WHERE star_temperature IS NOT NULL
ORDER BY star_temperature DESC
LIMIT 10;

--Query 9 – Largest Stars
SELECT host_star,
       star_radius
FROM planets
WHERE star_radius IS NOT NULL
ORDER BY star_radius DESC
LIMIT 10;

--Query 10 – Earth-sized Planets
SELECT planet_name,
       planet_radius_earth
FROM planets
WHERE planet_radius_earth BETWEEN 0.8 AND 1.2;

--Query 11 – Potentially Habitable Temperature
SELECT planet_name,
       equilibrium_temperature
FROM planets
WHERE equilibrium_temperature BETWEEN 200 AND 320;

--Query 12 – Earth Candidates
SELECT planet_name,
       planet_radius_earth,
       equilibrium_temperature,
       distance_pc
FROM planets
WHERE planet_radius_earth BETWEEN 0.8 AND 1.5
  AND equilibrium_temperature BETWEEN 200 AND 320;

--Query 13 – Average Radius
SELECT ROUND(AVG(planet_radius_earth)::numeric,2) AS avg_radius
FROM planets;

--Query 14 – Average Star Temperature
SELECT ROUND(AVG(star_temperature)::numeric,2) AS avg_star_temp
FROM planets;

--Query 15 – Discovery Timeline
SELECT discovery_year,
       COUNT(*) AS discoveries
FROM planets
GROUP BY discovery_year
ORDER BY discovery_year;

--Query 16 – Top 15 Host Stars
SELECT host_star,
       COUNT(*) AS planets
FROM planets
GROUP BY host_star
ORDER BY planets DESC
LIMIT 15;