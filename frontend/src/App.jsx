import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import api from "./services/api";
import StatCard from "./components/Cards/StatCard";

function App() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/analytics/summary")
      .then(res => setSummary(res.data))
      .catch(console.error);
  }, []);

  if (!summary)
    return <h2>Loading...</h2>;

  return (

    <Box sx={{ p: 5 }}>

      <Typography
        variant="h3"
        gutterBottom
      >
        🚀 Exoplanet Intelligence Platform
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Total Planets"
            value={summary.total_planets}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Host Stars"
            value={summary.total_host_stars}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Avg Radius"
            value={summary.average_radius.toFixed(2)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Avg Star Temp"
            value={`${summary.average_star_temperature.toFixed(0)} K`}
          />
        </Grid>

      </Grid>

    </Box>

  );

}

export default App;