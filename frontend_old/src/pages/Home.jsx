import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import api from "../services/api";
import StatCard from "../components/Cards/StatCard";

function Home() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {

    api.get("/analytics/summary")
      .then((res) => setSummary(res.data))
      .catch(console.error);

  }, []);

  if (!summary) {
    return <Typography>Loading...</Typography>;
  }

  return (

    <Box>

      <Typography
        variant="h3"
        sx={{ mb: 4 }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >

        <Box sx={{ width: 250 }}>
          <StatCard
            title="Planets"
            value={summary.total_planets}
          />
        </Box>

        <Box sx={{ width: 250 }}>
          <StatCard
            title="Host Stars"
            value={summary.total_host_stars}
          />
        </Box>

        <Box sx={{ width: 250 }}>
          <StatCard
            title="Average Radius"
            value={summary.average_radius.toFixed(2)}
          />
        </Box>

        <Box sx={{ width: 250 }}>
          <StatCard
            title="Average Star Temperature"
            value={`${summary.average_star_temperature.toFixed(0)} K`}
          />
        </Box>

      </Box>

      <Box sx={{ mt: 6 }}>

        <Typography variant="h5">
          Charts Temporarily Disabled
        </Typography>

        <Typography color="text.secondary">
          If this page stays visible, then one of the Recharts
          components is causing the crash.
        </Typography>

      </Box>

    </Box>

  );

}

export default Home;