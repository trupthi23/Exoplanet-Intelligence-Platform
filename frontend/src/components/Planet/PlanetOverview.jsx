import {
  Paper,
  Typography,
} from "@mui/material";

function PlanetOverview({ planet }) {

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 4,
      }}
    >

      <Typography
        variant="h5"
        gutterBottom
      >
        Planet Overview
      </Typography>

      <Typography
        color="text.secondary"
        lineHeight={2}
      >
        <strong>{planet.planet_name}</strong> was discovered in{" "}
        <strong>{planet.discovery_year}</strong> using the{" "}
        <strong>{planet.discovery_method}</strong> method.

        {" "}It orbits the host star{" "}
        <strong>{planet.host_star}</strong>

        {planet.orbital_period_days && (
          <>
            {" "}every{" "}
            <strong>
              {planet.orbital_period_days} days
            </strong>.
          </>
        )}

        {planet.distance_pc && (
          <>
            {" "}The planetary system is located approximately{" "}
            <strong>
              {planet.distance_pc.toFixed(1)} parsecs
            </strong>{" "}
            from Earth.
          </>
        )}
      </Typography>

    </Paper>
  );
}

export default PlanetOverview;