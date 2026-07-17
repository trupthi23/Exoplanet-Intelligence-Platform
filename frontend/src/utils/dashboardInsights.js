export function generateDashboardInsights(
  summary,
  methods,
  timeline,
  stars
) {

  if (
    !summary ||
    !methods ||
    !timeline ||
    !stars
  ) {
    return [];
  }

  const insights = [];

  if (methods.length > 0) {

    const topMethod =
      methods.reduce((a, b) =>
        a.count > b.count ? a : b
      );

    insights.push({
      title: "Discovery Trend",
      icon: "🛰",
      text:
        `${topMethod.discovery_method} remains the dominant discovery method with ${topMethod.count.toLocaleString()} confirmed planets.`,
      confidence: 99,
      importance: "High",
      trend: "▲"
    });

  }

  if (timeline.length > 0) {

    const peak =
      timeline.reduce((a, b) =>
        a.count > b.count ? a : b
      );

    insights.push({
      title: "Discovery Boom",
      icon: "📈",
      text:
        `${peak.discovery_year} recorded the highest number of confirmed discoveries.`,
      confidence: 97,
      importance: "High",
      trend: "▲"
    });

  }

  if (stars.length > 0) {

    insights.push({
      title: "Host Stars",
      icon: "⭐",
      text:
        `${stars[0].host_star} currently hosts the largest confirmed planetary system.`,
      confidence: 95,
      importance: "Medium",
      trend: "→"
    });

  }

  insights.push({
    title: "Planet Size",
    icon: "🌍",
    text:
      `Average planetary radius is ${summary.average_radius} Earth radii.`,
    confidence: 96,
    importance: "Medium",
    trend: "→"
  });

  insights.push({
    title: "Stellar Environment",
    icon: "☀️",
    text:
      `Average stellar temperature is ${summary.average_star_temperature} Kelvin.`,
    confidence: 94,
    importance: "Low",
    trend: "→"
  });

  insights.push({
    title: "NASA Archive",
    icon: "🪐",
    text:
      `The platform currently analyzes ${summary.total_planets.toLocaleString()} confirmed exoplanets.`,
    confidence: 100,
    importance: "High",
    trend: "▲"
  });

  return insights;

}