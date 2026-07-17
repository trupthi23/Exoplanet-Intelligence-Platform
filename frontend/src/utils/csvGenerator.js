import { saveAs } from "file-saver";

export function exportPlanetsCSV(planets) {

  if (!planets.length) return;

  const headers = [

    "Planet",

    "Discovery Method",

    "Discovery Year",

    "Host Star",

    "Radius (Earth)",

    "Mass (Earth)",

    "Orbital Period",

    "Temperature",

    "Habitability"

  ];

  const rows = planets.map((planet) => [

    planet.planet_name,

    planet.discovery_method,

    planet.discovery_year,

    planet.host_star,

    planet.planet_radius_earth ?? "",

    planet.planet_mass_earth ?? "",

    planet.orbital_period_days ?? "",

    planet.equilibrium_temperature ?? "",

    planet.habitability ?? ""

  ]);

  const csv = [

    headers.join(","),

    ...rows.map(row =>

      row
        .map(value => `"${value}"`)
        .join(",")

    )

  ].join("\n");

  const blob = new Blob(

    [csv],

    {

      type:"text/csv;charset=utf-8"

    }

  );

  const filename =

    `planets_export_${new Date()
      .toISOString()
      .slice(0,10)}.csv`;

  saveAs(blob, filename);

}