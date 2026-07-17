export function calculateSimilarity(referencePlanet, targetPlanet) {

  if (!referencePlanet || !targetPlanet) {
    return {
        similarity: 0,
        summary: "Unavailable",
        reasons: ["Similarity cannot be calculated."]
    };
  }

  let score = 0;

  const reasons = [];

  // ---------------- Radius ----------------

  if (
    referencePlanet.planet_radius_earth &&
    targetPlanet.planet_radius_earth
  ) {

    const difference = Math.abs(
      referencePlanet.planet_radius_earth -
      targetPlanet.planet_radius_earth
    );

    if (difference <= 0.2) {

      score += 20;

      reasons.push(
        "Very similar planetary radius."
      );

    } else if (difference <= 0.5) {

      score += 12;

      reasons.push(
        "Comparable planetary radius."
      );

    }

  }

  // ---------------- Mass ----------------

  if (
    referencePlanet.planet_mass_earth &&
    targetPlanet.planet_mass_earth
  ) {

    const difference = Math.abs(
      referencePlanet.planet_mass_earth -
      targetPlanet.planet_mass_earth
    );

    if (difference <= 1) {

      score += 20;

      reasons.push(
        "Similar planetary mass."
      );

    } else if (difference <= 3) {

      score += 12;

      reasons.push(
        "Comparable planetary mass."
      );

    }

  }

  // ---------------- Temperature ----------------

  if (
    referencePlanet.equilibrium_temperature &&
    targetPlanet.equilibrium_temperature
  ) {

    const difference = Math.abs(
      referencePlanet.equilibrium_temperature -
      targetPlanet.equilibrium_temperature
    );

    if (difference <= 20) {

      score += 20;

      reasons.push(
        "Nearly identical equilibrium temperature."
      );

    } else if (difference <= 50) {

      score += 12;

      reasons.push(
        "Comparable equilibrium temperature."
      );

    }

  }

  // ---------------- Orbital Period ----------------

  if (
    referencePlanet.orbital_period_days &&
    targetPlanet.orbital_period_days
  ) {

    const difference = Math.abs(
      referencePlanet.orbital_period_days -
      targetPlanet.orbital_period_days
    );

    if (difference <= 30) {

      score += 20;

      reasons.push(
        "Similar orbital period."
      );

    } else if (difference <= 100) {

      score += 10;

      reasons.push(
        "Comparable orbital period."
      );

    }

  }

  // ---------------- Host Star ----------------

  if (
    referencePlanet.star_temperature &&
    targetPlanet.star_temperature
  ) {

    const difference = Math.abs(
      referencePlanet.star_temperature -
      targetPlanet.star_temperature
    );

    if (difference <= 300) {

      score += 20;

      reasons.push(
        "Host stars have similar temperatures."
      );

    } else if (difference <= 700) {

      score += 10;

      reasons.push(
        "Host stars are moderately similar."
      );

    }

  }

  if (score > 100) {
    score = 100;
  }

  return {

    similarity: score,

    reasons,

    summary:
      score >= 85
        ? "Excellent Match"
        : score >= 70
        ? "Strong Match"
        : score >= 50
        ? "Moderate Match"
        : "Low Match",

  };

}