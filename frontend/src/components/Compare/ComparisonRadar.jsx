import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { calculateHabitability } from "../../utils/habitabilityScore";

function ComparisonRadar({ planetA, planetB }) {

  if (!planetA || !planetB) return null;

  const data = [
    {
      metric: "Mass",
      A: Math.min((planetA.planet_mass_earth || 0) / 100, 100),
      B: Math.min((planetB.planet_mass_earth || 0) / 100, 100),
    },
    {
      metric: "Radius",
      A: Math.min((planetA.planet_radius_earth || 0) * 20, 100),
      B: Math.min((planetB.planet_radius_earth || 0) * 20, 100),
    },
    {
      metric: "Orbit",
      A: Math.min((planetA.orbital_period_days || 0) / 10, 100),
      B: Math.min((planetB.orbital_period_days || 0) / 10, 100),
    },
    {
      metric: "Star Temp",
      A: Math.min((planetA.star_temperature || 0) / 60, 100),
      B: Math.min((planetB.star_temperature || 0) / 60, 100),
    },
    {
      metric: "Habitability",
      A: calculateHabitability(planetA),
      B: calculateHabitability(planetB),
    },
  ];

  return (
    <Card sx={{ mt: 5, borderRadius: 3 }}>
      <CardContent>

        <Typography variant="h5" gutterBottom>
          Planet Radar Comparison
        </Typography>

        <ResponsiveContainer width="100%" height={450}>

          <RadarChart data={data}>

            <PolarGrid />

            <PolarAngleAxis dataKey="metric" />

            <PolarRadiusAxis domain={[0, 100]} />

            <Radar
              name={planetA.planet_name}
              dataKey="A"
              fill="#3B82F6"
              stroke="#3B82F6"
              fillOpacity={0.35}
            />

            <Radar
              name={planetB.planet_name}
              dataKey="B"
              fill="#10B981"
              stroke="#10B981"
              fillOpacity={0.35}
            />

            <Legend />

          </RadarChart>

        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}

export default ComparisonRadar;