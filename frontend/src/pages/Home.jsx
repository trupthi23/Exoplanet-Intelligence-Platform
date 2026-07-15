import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

import api from "../services/api";

import StatCard from "../components/Cards/StatCard";
import DiscoveryTimeline from "../components/Charts/DiscoveryTimeline";

function Home() {
  const [summary, setSummary] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/analytics/summary"),
      api.get("/analytics/discovery-timeline"),
    ])
      .then(([summaryRes, timelineRes]) => {
        setSummary(summaryRes.data);
        setTimeline(timelineRes.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!summary) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>

      <Typography
        variant="h3"
        gutterBottom
      >
        🚀 Exoplanet Intelligence Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        NASA Exoplanet Archive Analytics
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Planets"
            value={summary.total_planets}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Host Stars"
            value={summary.total_host_stars}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Average Radius"
            value={summary.average_radius}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Average Star Temperature"
            value={summary.average_star_temperature}
          />
        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 3,
          mt: 5,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
        >
          📈 Discovery Timeline
        </Typography>

        <DiscoveryTimeline
          data={timeline}
        />

      </Paper>

    </Box>
  );
}

export default Home;