export function calculateHabitability(planet) {

    let score = 50;

    // Temperature

    if (
        planet.equilibrium_temperature &&
        planet.equilibrium_temperature >= 220 &&
        planet.equilibrium_temperature <= 320
    ) {
        score += 20;
    }

    // Radius

    if (
        planet.planet_radius_earth &&
        planet.planet_radius_earth >= 0.8 &&
        planet.planet_radius_earth <= 1.8
    ) {
        score += 15;
    }

    // Mass

    if (
        planet.planet_mass_earth &&
        planet.planet_mass_earth >= 0.5 &&
        planet.planet_mass_earth <= 5
    ) {
        score += 15;
    }

    return Math.min(score, 100);
}