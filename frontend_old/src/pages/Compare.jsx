import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import api from "../services/api";

function Compare() {
  const { id } = useParams();

  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/planets/${id}`)
      .then((res) => {
        setPlanet(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const radius = planet.planet_radius_earth ?? 0;
  const mass = planet.planet_mass_earth ?? 0;
  const temperature = planet.equilibrium_temperature ?? 0;

  const radiusPercent = Math.min(radius * 20, 100);
  const massPercent = Math.min(mass * 5, 100);
  const temperaturePercent = Math.min(
    (temperature / 3000) * 100,
    100
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 4 }}>
      <Typography variant="h3" gutterBottom>
        🌍 Earth Comparison
      </Typography>

      <Typography
        variant="h5"
        sx={{ mb: 4 }}
      >
        {planet.planet_name}
      </Typography>

      {/* Comparison Cards */}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                🌍 Radius
              </Typography>

              <Typography variant="h4">
                {planet.planet_radius_earth ?? "Unknown"}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={radiusPercent}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                ⚖️ Mass
              </Typography>

              <Typography variant="h4">
                {planet.planet_mass_earth ?? "Unknown"}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={massPercent}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                🔥 Temperature
              </Typography>

              <Typography variant="h4">
                {planet.equilibrium_temperature ?? "Unknown"}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={temperaturePercent}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Comparison Table */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Property</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Earth</strong>
              </TableCell>

              <TableCell align="center">
                <strong>{planet.planet_name}</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>Radius (Earth = 1)</TableCell>
              <TableCell align="center">1.00</TableCell>
              <TableCell align="center">
                {planet.planet_radius_earth ?? "Unknown"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Mass (Earth = 1)</TableCell>
              <TableCell align="center">1.00</TableCell>
              <TableCell align="center">
                {planet.planet_mass_earth ?? "Unknown"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Temperature (K)</TableCell>
              <TableCell align="center">288</TableCell>
              <TableCell align="center">
                {planet.equilibrium_temperature ?? "Unknown"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Star Temperature (K)</TableCell>
              <TableCell align="center">5778</TableCell>
              <TableCell align="center">
                {planet.star_temperature ?? "Unknown"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Distance (pc)</TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">
                {planet.distance_pc ?? "Unknown"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Discovery Year</TableCell>
              <TableCell align="center">—</TableCell>
              <TableCell align="center">
                {planet.discovery_year}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Discovery Method</TableCell>
              <TableCell align="center">—</TableCell>
              <TableCell align="center">
                {planet.discovery_method}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Compare;