import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportComparisonReport(
  planetA,
  planetB,
  scoreA,
  scoreB
) {

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "Planet Comparison Report",
    14,
    20
  );

  doc.setFontSize(11);

  doc.text(
    "Exoplanet Discovery & Habitability Intelligence Platform",
    14,
    28
  );

  autoTable(doc,{

    startY:40,

    head:[
      [
        "Property",
        planetA.planet_name,
        planetB.planet_name
      ]
    ],

    body:[

      [
        "Habitability",
        `${scoreA}/100`,
        `${scoreB}/100`
      ],

      [
        "Discovery Method",
        planetA.discovery_method,
        planetB.discovery_method
      ],

      [
        "Discovery Year",
        planetA.discovery_year,
        planetB.discovery_year
      ],

      [
        "Host Star",
        planetA.host_star,
        planetB.host_star
      ],

      [
        "Radius",
        planetA.planet_radius_earth ?? "-",
        planetB.planet_radius_earth ?? "-"
      ],

      [
        "Mass",
        planetA.planet_mass_earth ?? "-",
        planetB.planet_mass_earth ?? "-"
      ],

      [
        "Orbital Period",
        planetA.orbital_period_days ?? "-",
        planetB.orbital_period_days ?? "-"
      ],

      [
        "Temperature",
        planetA.equilibrium_temperature ?? "-",
        planetB.equilibrium_temperature ?? "-"
      ],

      [
        "Star Temperature",
        planetA.star_temperature ?? "-",
        planetB.star_temperature ?? "-"
      ]

    ],

    headStyles:{
      fillColor:[37,99,235]
    }

  });

  doc.save("Planet_Comparison_Report.pdf");

}