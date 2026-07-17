import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import api from "../services/api";

import LoadingScreen from "../components/Common/LoadingScreen";

import PlanetStatCard from "../components/Planet/PlanetStatCard";
import PlanetOverview from "../components/Planet/PlanetOverview";
import HabitabilityCard from "../components/Planet/HabitabilityCard";
import HabitabilityExplanation from "../components/Planet/HabitabilityExplanation";
import HabitabilityBreakdown from "../components/Planet/HabitabilityBreakdown";
import PlanetIntelligenceCard from "../components/Planet/PlanetIntelligenceCard";
import SimilarPlanets from "../components/SimilarPlanets/SimilarPlanets";

import { calculateHabitability } from "../utils/habitabilityScore";
import { generatePlanetIntelligence } from "../utils/planetIntelligence";
import { generateHabitabilityExplanation } from "../utils/habitabilityExplanation";

import { exportPlanetReport } from "../utils/pdfGenerator";

function PlanetDetails() {
  const { id } = useParams();

  const [planet, setPlanet] = useState(null);
  const [similarPlanets, setSimilarPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlanet() {
      try {
        setLoading(true);

        const planetRes = await api.get(`/planets/${id}`);
        setPlanet(planetRes.data);

        const similarRes = await api.get(`/planets/${id}/similar`);
        setSimilarPlanets(similarRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPlanet();
  }, [id]);

  // ======================================
  // Memoized Calculations 
  // ======================================

  const habitabilityScore = useMemo(() => {
    if (!planet) return 0;
    return calculateHabitability(planet);
  }, [planet]);

  const intelligence = useMemo(() => {
    if (!planet) return null;
    return generatePlanetIntelligence(planet);
  }, [planet]);

  const explanation = useMemo(() => {
    if (!planet) return null;
    return generateHabitabilityExplanation(planet);
  }, [planet]);

  // ======================================

  if (loading) {
    return (
      <LoadingScreen
        title="Loading Planet Intelligence..."
        subtitle="Analyzing planetary characteristics..."
      />
    );
  }

  if (!planet) {
    return (
      <Typography color="error">
        Planet not found.
      </Typography>
    );
  }

  return (
    <Box>

      {/* Hero */}

      <Box
        mb={5}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={3}
      >

        <Box>

          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
          >
            🪐 {planet.planet_name}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Planet Intelligence Report
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >

            <Chip
              color="primary"
              label={planet.discovery_method}
            />

            <Chip
              color="secondary"
              label={`Discovered ${planet.discovery_year}`}
            />

          </Stack>

        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<PictureAsPdfIcon />}
          onClick={() =>
            exportPlanetReport(
              planet,
              habitabilityScore,
              explanation
            )
          }
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.4,
            fontWeight: 700,
          }}
        >
          Export Report
        </Button>

      </Box>

      <PlanetIntelligenceCard
        intelligence={intelligence}
      />

      <PlanetOverview
        planet={planet}
      />

      <HabitabilityCard
        score={habitabilityScore}
      />

      <HabitabilityExplanation
        explanation={explanation}
      />

      <HabitabilityBreakdown
        planet={planet}
      />

      <Grid container spacing={3} sx={{ mt: 2 }}>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Discovery Method"
            value={planet.discovery_method}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Discovery Year"
            value={planet.discovery_year}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Host Star"
            value={planet.host_star}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Planet Mass"
            value={planet.planet_mass_earth}
            unit="Earth Masses"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Planet Radius"
            value={planet.planet_radius_earth}
            unit="Earth Radii"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Orbital Period"
            value={planet.orbital_period_days}
            unit="Days"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Distance"
            value={planet.distance_pc}
            unit="pc"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Star Mass"
            value={planet.star_mass}
            unit="Solar Masses"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Star Radius"
            value={planet.star_radius}
            unit="Solar Radii"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlanetStatCard
            title="Star Temperature"
            value={planet.star_temperature}
            unit="K"
          />
        </Grid>

      </Grid>

      <SimilarPlanets
        currentPlanet={planet}
        planets={similarPlanets}
      />

    </Box>
  );
}

export default PlanetDetails;