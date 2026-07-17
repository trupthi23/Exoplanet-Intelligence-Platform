import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import { calculateHabitability } from "../../utils/habitabilityScore";

function ComparisonTable({ planetA, planetB }) {
  if (!planetA || !planetB) return null;

  const rows = [
    {
      label: "Discovery Method",
      a: planetA.discovery_method,
      b: planetB.discovery_method,
    },
    {
      label: "Discovery Year",
      a: planetA.discovery_year,
      b: planetB.discovery_year,
    },
    {
      label: "Host Star",
      a: planetA.host_star,
      b: planetB.host_star,
    },
    {
      label: "Planet Mass",
      a: planetA.planet_mass_earth ?? "-",
      b: planetB.planet_mass_earth ?? "-",
    },
    {
      label: "Planet Radius",
      a: planetA.planet_radius_earth ?? "-",
      b: planetB.planet_radius_earth ?? "-",
    },
    {
      label: "Orbital Period",
      a: planetA.orbital_period_days ?? "-",
      b: planetB.orbital_period_days ?? "-",
    },
    {
      label: "Habitability Score",
      a: calculateHabitability(planetA),
      b: calculateHabitability(planetB),
    },
  ];

  return (
    <Card sx={{ mt: 5, borderRadius: 3 }}>
      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
        >
          Side-by-Side Comparison
        </Typography>

        <Table>

          <TableBody>

            {rows.map((row) => (

              <TableRow key={row.label}>

                <TableCell>
                  <strong>{row.label}</strong>
                </TableCell>

                <TableCell>
                  {row.a}
                </TableCell>

                <TableCell>
                  {row.b}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </CardContent>
    </Card>
  );
}

export default ComparisonTable;