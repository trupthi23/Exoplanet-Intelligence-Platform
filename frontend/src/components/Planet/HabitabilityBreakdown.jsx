import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";

function HabitabilityBreakdown({ planet }) {

  const temperature =
    planet.equilibrium_temperature &&
    planet.equilibrium_temperature >= 180 &&
    planet.equilibrium_temperature <= 330
      ? 100
      : 35;

  const radius =
    planet.planet_radius_earth &&
    planet.planet_radius_earth <= 2
      ? 100
      : 40;

  const mass =
    planet.planet_mass_earth &&
    planet.planet_mass_earth <= 10
      ? 100
      : 35;

  const orbit =
    planet.orbital_period_days &&
    planet.orbital_period_days >= 50
      ? 100
      : 45;

  const rows = [
    {
      title: "Temperature",
      value: temperature,
    },
    {
      title: "Planet Radius",
      value: radius,
    },
    {
      title: "Planet Mass",
      value: mass,
    },
    {
      title: "Orbital Period",
      value: orbit,
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        mb: 4,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
        >
          Habitability Analysis
        </Typography>

        <Stack spacing={3} mt={3}>

          {rows.map((row) => (

            <div key={row.title}>

              <Typography gutterBottom>
                {row.title}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={row.value}
                sx={{
                  height: 10,
                  borderRadius: 5,
                }}
              />

            </div>

          ))}

        </Stack>

      </CardContent>
    </Card>
  );
}

export default HabitabilityBreakdown;