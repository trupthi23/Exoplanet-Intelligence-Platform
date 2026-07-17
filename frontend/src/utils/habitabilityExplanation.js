export function generateHabitabilityExplanation(planet) {

  const breakdown = [];

  let total = 0;

  // ---------------- Radius ----------------

  if (
    planet.planet_radius_earth &&
    planet.planet_radius_earth >= 0.8 &&
    planet.planet_radius_earth <= 1.5
  ) {

    breakdown.push({
      title: "Earth-like Radius",
      score: 25,
      reason:
        "The planet's radius is similar to Earth's, increasing the likelihood of a rocky surface."
    });

    total += 25;

  } else {

    breakdown.push({
      title: "Earth-like Radius",
      score: 10,
      reason:
        "The planet radius differs significantly from Earth."
    });

    total += 10;

  }

  // ---------------- Temperature ----------------

  if (
    planet.equilibrium_temperature &&
    planet.equilibrium_temperature >= 180 &&
    planet.equilibrium_temperature <= 320
  ) {

    breakdown.push({
      title: "Equilibrium Temperature",
      score: 20,
      reason:
        "Temperature lies within a potentially habitable range."
    });

    total += 20;

  } else {

    breakdown.push({
      title: "Equilibrium Temperature",
      score: 8,
      reason:
        "Temperature is outside the preferred range."
    });

    total += 8;

  }

  // ---------------- Mass ----------------

  if (
    planet.planet_mass_earth &&
    planet.planet_mass_earth >= 0.5 &&
    planet.planet_mass_earth <= 5
  ) {

    breakdown.push({
      title: "Planet Mass",
      score: 20,
      reason:
        "Mass suggests a rocky terrestrial planet."
    });

    total += 20;

  } else {

    breakdown.push({
      title: "Planet Mass",
      score: 8,
      reason:
        "Mass falls outside the ideal terrestrial range."
    });

    total += 8;

  }

  // ---------------- Orbit ----------------

  if (
    planet.orbital_period_days &&
    planet.orbital_period_days >= 150 &&
    planet.orbital_period_days <= 500
  ) {

    breakdown.push({
      title: "Orbital Period",
      score: 15,
      reason:
        "Orbital period resembles Earth's revolution."
    });

    total += 15;

  } else {

    breakdown.push({
      title: "Orbital Period",
      score: 6,
      reason:
        "Orbit differs considerably from Earth."
    });

    total += 6;

  }

  // ---------------- Host Star ----------------

  if (
    planet.star_temperature &&
    planet.star_temperature >= 4500 &&
    planet.star_temperature <= 6500
  ) {

    breakdown.push({
      title: "Host Star",
      score: 20,
      reason:
        "Host star temperature is similar to our Sun."
    });

    total += 20;

  } else {

    breakdown.push({
      title: "Host Star",
      score: 7,
      reason:
        "Host star differs from Sun-like stars."
    });

    total += 7;

  }

  return {

    total,

    breakdown

  };

}