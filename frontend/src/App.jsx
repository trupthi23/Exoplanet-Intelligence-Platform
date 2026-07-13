import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import api from "./services/api";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import StatCard from "./components/Cards/StatCard";

function App() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api
      .get("/analytics/summary")
      .then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <h2>Loading...</h2>;

  return (

    <>
      <Navbar />

      <Box
        sx={{
          display: "flex"
        }}
      >

        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            p: 4
          }}
        >

          <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 3 }}>
              <StatCard
                title="Planets"
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
                title="Average Radius"
                value={summary.average_radius.toFixed(2)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <StatCard
                title="Average Star Temp"
                value={`${summary.average_star_temperature.toFixed(0)} K`}
              />
            </Grid>

          </Grid>

        </Box>

      </Box>

    </>

  );

}

export default App;