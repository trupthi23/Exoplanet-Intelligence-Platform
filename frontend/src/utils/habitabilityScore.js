export function calculateHabitability(planet) {

    let score = 100;

    if (
        planet.equilibrium_temperature &&
        (planet.equilibrium_temperature < 180 ||
            planet.equilibrium_temperature > 330)
    ) {
        score -= 25;
    }

    if (
        planet.planet_radius_earth &&
        planet.planet_radius_earth > 2
    ) {
        score -= 20;
    }

    if (
        planet.planet_mass_earth &&
        planet.planet_mass_earth > 10
    ) {
        score -= 20;
    }

    if (
        planet.orbital_period_days &&
        planet.orbital_period_days < 50
    ) {
        score -= 15;
    }

    return Math.max(score, 0);
}