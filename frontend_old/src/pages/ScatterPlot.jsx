import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Box, CircularProgress, Typography } from "@mui/material";
import api from "../services/api";

function ScatterPlot() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/planets")
      .then((res) => setPlanets(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const filtered = planets.filter(
    (p) =>
      p.planet_radius_earth != null &&
      p.planet_mass_earth != null
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        📊 Radius vs Mass Analysis
      </Typography>

      <Plot
        data={[
          {
            x: filtered.map((p) => p.planet_radius_earth),
            y: filtered.map((p) => p.planet_mass_earth),
            text: filtered.map((p) => p.planet_name),
            mode: "markers",
            type: "scatter",
            marker: {
              size: 8,
            },
          },
        ]}
        layout={{
          title: "Planet Radius vs Planet Mass",
          xaxis: {
            title: "Radius (Earth Radii)",
          },
          yaxis: {
            title: "Mass (Earth Masses)",
          },
          autosize: true,
          height: 600,
        }}
        style={{ width: "100%" }}
      />
    </Box>
  );
}

export default ScatterPlot;