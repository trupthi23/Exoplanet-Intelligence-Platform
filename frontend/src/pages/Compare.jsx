import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import api from "../services/api";

import LoadingScreen from "../components/Common/LoadingScreen";

import { calculateHabitability } from "../utils/habitabilityScore";
import { exportComparisonReport } from "../utils/comparisonPdf";

import ComparisonTable from "../components/Compare/ComparisonTable";
import ComparisonRadar from "../components/Compare/ComparisonRadar";

function Compare() {

  const [planets, setPlanets] = useState([]);

  const [planetA, setPlanetA] = useState(null);
  const [planetB, setPlanetB] = useState(null);

  const [planetADetails, setPlanetADetails] = useState(null);
  const [planetBDetails, setPlanetBDetails] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api
      .get("/planets?limit=500")
      .then((res) => {
        setPlanets(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, []);

  useEffect(() => {

    if (!planetA) {
      setPlanetADetails(null);
      return;
    }

    api
      .get(`/planets/${planetA.id}`)
      .then((res) => setPlanetADetails(res.data))
      .catch(console.error);

  }, [planetA]);

  useEffect(() => {

    if (!planetB) {
      setPlanetBDetails(null);
      return;
    }

    api
      .get(`/planets/${planetB.id}`)
      .then((res) => setPlanetBDetails(res.data))
      .catch(console.error);

  }, [planetB]);

  if (loading) {

    return (

      <LoadingScreen
        title="Loading Comparison Engine..."
        subtitle="Preparing planet comparison..."
      />

    );

  }

  const renderPlanetCard = (planet) => {

    if (!planet) return null;

    return (

      <Card
        sx={{
          borderRadius: 3,
          height: "100%",
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            gutterBottom
          >
            {planet.planet_name}
          </Typography>

          <Typography>
            <strong>Host Star:</strong> {planet.host_star}
          </Typography>

          <Typography>
            <strong>Discovery:</strong> {planet.discovery_method}
          </Typography>

          <Typography>
            <strong>Year:</strong> {planet.discovery_year}
          </Typography>

          <Typography>
            <strong>Mass:</strong> {planet.planet_mass_earth ?? "-"}
          </Typography>

          <Typography>
            <strong>Radius:</strong> {planet.planet_radius_earth ?? "-"}
          </Typography>

          <Typography>
            <strong>Orbital Period:</strong> {planet.orbital_period_days ?? "-"}
          </Typography>

          <Typography>
            <strong>Habitability:</strong> {calculateHabitability(planet)}/100
          </Typography>

        </CardContent>
      </Card>

    );

  };

  return (

    <Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >

        <Box>

          <Typography
            variant="h3"
            gutterBottom
          >
            🪐 Planet Comparison
          </Typography>

          <Typography color="text.secondary">
            Select two planets to compare their characteristics,
            habitability, and stellar environments.
          </Typography>

        </Box>

        {planetADetails && planetBDetails && (

          <Button

            variant="contained"

            startIcon={<DownloadIcon />}

            onClick={() =>
              exportComparisonReport(
                planetADetails,
                planetBDetails,
                calculateHabitability(planetADetails),
                calculateHabitability(planetBDetails)
              )
            }

            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.3,
              fontWeight: 700,
            }}

          >

            Export PDF

          </Button>

        )}

      </Stack>

      <Autocomplete

        options={planets}

        getOptionLabel={(option) => option.planet_name}

        value={planetA}

        onChange={(event, value) =>
          setPlanetA(value)
        }

        renderInput={(params) => (
          <TextField
            {...params}
            label="Planet A"
          />
        )}

        sx={{ mb: 3 }}

      />

      <Autocomplete

        options={planets}

        getOptionLabel={(option) => option.planet_name}

        value={planetB}

        onChange={(event, value) =>
          setPlanetB(value)
        }

        renderInput={(params) => (
          <TextField
            {...params}
            label="Planet B"
          />
        )}

        sx={{ mb: 5 }}

      />

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        <Grid
          item
          xs={12}
          md={6}
        >
          {renderPlanetCard(planetADetails)}
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          {renderPlanetCard(planetBDetails)}
        </Grid>

      </Grid>

      {!planetADetails || !planetBDetails ? (

        <Box
          sx={{
            py: 10,
            textAlign: "center",
          }}
        >

          <Typography variant="h1">
            🪐
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Select Two Planets
          </Typography>

          <Typography color="text.secondary">
            Choose Planet A and Planet B to begin comparing
            their planetary properties.
          </Typography>

        </Box>

      ) : (

        <>

          <ComparisonTable

            planetA={planetADetails}

            planetB={planetBDetails}

          />

          <ComparisonRadar

            planetA={planetADetails}

            planetB={planetBDetails}

          />

        </>

      )}

    </Box>

  );

}

export default Compare;