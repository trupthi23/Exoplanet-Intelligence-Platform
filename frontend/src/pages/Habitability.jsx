import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";

import api from "../services/api";

import LoadingScreen from "../components/Common/LoadingScreen";

import { calculateHabitability } from "../utils/habitabilityScore";

import HabitabilityTable from "../components/Habitability/HabitabilityTable";
import HabitabilityDistribution from "../components/Habitability/HabitabilityDistribution";

function Habitability() {

  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minimumScore, setMinimumScore] = useState(0);
  const [discoveryMethod, setDiscoveryMethod] = useState("All");

  useEffect(() => {

    api
      .get("/planets?limit=100")
      .then((res) => {

        const ranked = res.data.data
          .map((planet) => ({
            ...planet,
            habitability: calculateHabitability(planet),
          }))
          .sort((a, b) => b.habitability - a.habitability);

        setPlanets(ranked);

      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, []);

  const methods = [
    "All",
    ...new Set(
      planets.map((planet) => planet.discovery_method)
    ),
  ];

  const filteredPlanets = planets.filter((planet) => {

    const scoreMatch =
      planet.habitability >= minimumScore;

    const methodMatch =
      discoveryMethod === "All" ||
      planet.discovery_method === discoveryMethod;

    return scoreMatch && methodMatch;

  });

  const highestScore =
    filteredPlanets.length > 0
      ? filteredPlanets[0].habitability
      : 0;

  const averageScore =
    filteredPlanets.length > 0
      ? (
          filteredPlanets.reduce(
            (sum, p) => sum + p.habitability,
            0
          ) / filteredPlanets.length
        ).toFixed(1)
      : 0;

  const habitableCount =
    filteredPlanets.filter(
      (planet) => planet.habitability >= 80
    ).length;

  if (loading) {
    return (
      <LoadingScreen
        title="Loading Habitability Explorer..."
        subtitle="Calculating habitability scores..."
      />
    );
  }

  return (
    <Box>

      <Box
        sx={{
          mb: 5,
          p: 5,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#1E3A8A,#0F172A)",
          color: "white",
        }}
      >

        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
        >
          🌍 Habitability Explorer
        </Typography>

        <Typography
          sx={{
            opacity: .9,
            lineHeight: 1.8,
            maxWidth: 750,
          }}
        >
          Explore potentially habitable exoplanets using our
          custom scoring algorithm.
        </Typography>

      </Box>

      <Grid container spacing={2} sx={{ mb: 5 }}>

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            type="number"
            label="Minimum Habitability Score"
            value={minimumScore}
            onChange={(e) =>
              setMinimumScore(Number(e.target.value))
            }
          />

        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            fullWidth
            select
            label="Discovery Method"
            value={discoveryMethod}
            onChange={(e) =>
              setDiscoveryMethod(e.target.value)
            }
          >

            {methods.map((method) => (

              <MenuItem
                key={method}
                value={method}
              >
                {method}
              </MenuItem>

            ))}

          </TextField>

        </Grid>

      </Grid>

      <Grid container spacing={3} sx={{ mb: 5 }}>

        {[
          {
            title: "Highest Score",
            value: highestScore,
            icon: "⭐",
          },
          {
            title: "Planets Ranked",
            value: filteredPlanets.length,
            icon: "🪐",
          },
          {
            title: "Potentially Habitable",
            value: habitableCount,
            icon: "🌍",
          },
          {
            title: "Average Score",
            value: averageScore,
            icon: "📊",
          },
        ].map((card) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={card.title}
          >

            <Card
              sx={{
                borderRadius: 2,
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 8,
                },
              }}
            >

              <CardContent>

                <Typography sx={{ fontSize: 34 }}>
                  {card.icon}
                </Typography>

                <Typography color="text.secondary">
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {card.value}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

      {filteredPlanets.length === 0 ? (

        <Box
          sx={{
            py: 10,
            textAlign: "center",
          }}
        >

          <Typography variant="h1">
            🌍
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            No Habitable Planets Found
          </Typography>

          <Typography color="text.secondary">
            Try lowering the minimum score or
            selecting another discovery method.
          </Typography>

        </Box>

      ) : (

        <>

          <Typography
            variant="h5"
            gutterBottom
          >
            Top Ranked Planet
          </Typography>

          <Typography
            variant="h4"
            color="primary"
          >
            {filteredPlanets[0].planet_name}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Score:
            {" "}
            {filteredPlanets[0].habitability}/100
          </Typography>

          <HabitabilityTable
            planets={filteredPlanets}
          />

          <HabitabilityDistribution
            planets={filteredPlanets}
          />

        </>

      )}

    </Box>
  );
}

export default Habitability;