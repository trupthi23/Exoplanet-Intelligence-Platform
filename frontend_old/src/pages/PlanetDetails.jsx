import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import api from "../services/api";

function PlanetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planet, setPlanet] = useState(null);
  const [similarPlanets, setSimilarPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get(`/planets/${id}`),
      api.get(`/planets/${id}/similar`)
    ])
      .then(([planetRes, similarRes]) => {
        setPlanet(planetRes.data);
        setSimilarPlanets(similarRes.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!planet || planet.error) {
    return (
      <Typography variant="h5" sx={{ mt: 5 }}>
        Planet not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        ← Back
      </Button>

      <Typography
        variant="h3"
        gutterBottom
        fontWeight="bold"
      >
        🪐 {planet.planet_name}
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Complete scientific information from the NASA Exoplanet Archive.
      </Typography>

      {/* Planet Information */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📋 Planet Information
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography>
            <strong>Host Star:</strong> {planet.host_star || "Unknown"}
          </Typography>

          <Typography>
            <strong>Discovery Method:</strong> {planet.discovery_method || "Unknown"}
          </Typography>

          <Typography>
            <strong>Discovery Year:</strong> {planet.discovery_year || "Unknown"}
          </Typography>
        </CardContent>
      </Card>

      {/* Physical Properties */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🌍 Physical Properties
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography>
            <strong>Planet Radius:</strong> {planet.planet_radius_earth ?? "Unknown"} Earth Radii
          </Typography>

          <Typography>
            <strong>Planet Mass:</strong> {planet.planet_mass_earth ?? "Unknown"} Earth Masses
          </Typography>

          <Typography>
            <strong>Orbital Period:</strong> {planet.orbital_period_days ?? "Unknown"} days
          </Typography>

          <Typography>
            <strong>Equilibrium Temperature:</strong> {planet.equilibrium_temperature ?? "Unknown"} K
          </Typography>
        </CardContent>
      </Card>

      {/* Stellar Properties */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            ☀ Stellar Properties
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography>
            <strong>Star Temperature:</strong> {planet.star_temperature ?? "Unknown"} K
          </Typography>

          <Typography>
            <strong>Star Radius:</strong> {planet.star_radius ?? "Unknown"} Solar Radii
          </Typography>

          <Typography>
            <strong>Star Mass:</strong> {planet.star_mass ?? "Unknown"} Solar Masses
          </Typography>
        </CardContent>
      </Card>

      {/* Location */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📍 Location
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography>
            <strong>Distance:</strong> {planet.distance_pc ?? "Unknown"} parsecs
          </Typography>

          <Typography>
            <strong>Right Ascension:</strong> {planet.right_ascension ?? "Unknown"}
          </Typography>

          <Typography>
            <strong>Declination:</strong> {planet.declination ?? "Unknown"}
          </Typography>
        </CardContent>
      </Card>

      {/* Earth Comparison */}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🌍 Earth Comparison
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography sx={{ mb: 2 }}>
            Compare this exoplanet with Earth using key planetary characteristics.
          </Typography>

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

          <Typography variant="h5" gutterBottom>
            🤖 Similar Planets (ML Recommendations)
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography sx={{ mb: 2 }}>
            Based on Radius, Mass, Temperature and Orbital Period.
          </Typography>

          <List>

            {similarPlanets.map((item) => (

              <ListItemButton
                key={item.id}
                onClick={() => navigate(`/planet/${item.id}`)}
              >

                <ListItemText
                  primary={item.planet_name}
                  secondary={`${item.discovery_method} • ${item.discovery_year}`}
                />

              </ListItemButton>

            ))}

          </List>

        </CardContent>
      </Card>

    </Box>
  );
}

export default PlanetDetails;