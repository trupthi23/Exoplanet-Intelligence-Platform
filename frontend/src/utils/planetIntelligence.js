import { calculateHabitability } from "./habitabilityScore";

export function generatePlanetIntelligence(planet) {

  const score = calculateHabitability(planet);

  const positives = [];
  const concerns = [];

  /* ---------- Radius ---------- */

  if (
    planet.planet_radius_earth &&
    planet.planet_radius_earth >= 0.8 &&
    planet.planet_radius_earth <= 1.5
  ) {
    positives.push(
      "Earth-like planetary radius"
    );
  } else {
    concerns.push(
      "Planet radius differs significantly from Earth"
    );
  }

  /* ---------- Temperature ---------- */

  if (
    planet.equilibrium_temperature &&
    planet.equilibrium_temperature >= 180 &&
    planet.equilibrium_temperature <= 320
  ) {
    positives.push(
      "Moderate equilibrium temperature"
    );
  } else {
    concerns.push(
      "Temperature may not support Earth-like conditions"
    );
  }

  /* ---------- Mass ---------- */

  if (
    planet.planet_mass_earth &&
    planet.planet_mass_earth >= 0.5 &&
    planet.planet_mass_earth <= 5
  ) {
    positives.push(
      "Mass falls within a potentially rocky planet range"
    );
  } else {
    concerns.push(
      "Planet mass is outside the preferred terrestrial range"
    );
  }

  /* ---------- Orbital Period ---------- */

  if (
    planet.orbital_period_days &&
    planet.orbital_period_days >= 150 &&
    planet.orbital_period_days <= 500
  ) {
    positives.push(
      "Orbital period is similar to Earth's"
    );
  }

  /* ---------- Host Star ---------- */

  if (planet.star_temperature) {

    if (
      planet.star_temperature >= 4500 &&
      planet.star_temperature <= 6500
    ) {

      positives.push(
        "Host star temperature is suitable for stable environments"
      );

    } else {

      concerns.push(
        "Host star differs from Sun-like temperatures"
      );

    }

  }

  /* ---------- Title ---------- */

  let title = "";

  if (score >= 80) {

    title = "Excellent Habitability Candidate";

  } else if (score >= 60) {

    title = "Promising Candidate";

  } else if (score >= 40) {

    title = "Moderate Potential";

  } else {

    title = "Low Habitability Potential";

  }

  /* ---------- Summary ---------- */

  let summary = `${planet.planet_name} has an estimated habitability score of ${score}/100. `;

  if (score >= 80) {

    summary +=
      "Its planetary characteristics indicate strong potential for Earth-like conditions and future scientific investigation.";

  }

  else if (score >= 60) {

    summary +=
      "Several characteristics are favourable, although additional observations would be required before assessing long-term habitability.";

  }

  else if (score >= 40) {

    summary +=
      "The planet exhibits a mixture of favourable and unfavourable characteristics for supporting Earth-like environments.";

  }

  else {

    summary +=
      "Current observations suggest limited potential for Earth-like habitability based on the available planetary data.";

  }

  return {

    title,

    score,

    confidence: Math.min(
      100,
      positives.length * 18 +
      35
    ),

    positives,

    concerns,

    summary,

  };

}