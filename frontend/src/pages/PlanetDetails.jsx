import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";

import api from "../services/api";

function PlanetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    api.get(`/planets/${id}`)
      .then((res) => setPlanet(res.data));
  }, [id]);

  if (!planet) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>

      <Typography variant="h3" gutterBottom>
        🪐 {planet.planet_name}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Typography variant="h5">
            Planet Information
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <b>Host Star:</b> {planet.host_star}
          </Typography>

          <Typography>
            <b>Discovery Method:</b> {planet.discovery_method}
          </Typography>

          <Typography>
            <b>Discovery Year:</b> {planet.discovery_year}
          </Typography>

          <Typography>
            <b>Radius:</b> {planet.planet_radius_earth}
          </Typography>

          <Typography>
            <b>Mass:</b> {planet.planet_mass_earth}
          </Typography>

          <Typography>
            <b>Temperature:</b> {planet.equilibrium_temperature}
          </Typography>

          <Typography>
            <b>Orbital Period:</b> {planet.orbital_period_days}
          </Typography>

        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Typography variant="h5">
            🌍 Earth Comparison
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            onClick={() => navigate(`/compare/${planet.id}`)}
          >
            Compare With Earth
          </Button>

        </CardContent>
      </Card>

      {/* Similar Planets */}

      <Card>
        <CardContent>

          <Typography variant="h5">
            🤖 Similar Exoplanets
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography color="text.secondary">
            Find planets with similar physical characteristics using our ML recommendation engine.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate(`/planet/${planet.id}/similar`)}
          >
            View Recommendations
          </Button>

        </CardContent>
      </Card>

    </Box>
  );
}

export default PlanetDetails;