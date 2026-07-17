import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { calculateHabitability } from "../utils/habitabilityScore";

function Habitability() {

  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    api
      .get("/planets")
      .then((res) => {

        const ranked = res.data
          .map((planet) => ({
            ...planet,
            score: calculateHabitability(planet),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        setPlanets(ranked);

      })
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

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: 4 }}>

      <Typography variant="h3" gutterBottom>
        🌍 Top Habitability Rankings
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        AI-inspired ranking of the most potentially habitable exoplanets.
      </Typography>

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><strong>Rank</strong></TableCell>

              <TableCell><strong>Planet</strong></TableCell>

              <TableCell><strong>Score</strong></TableCell>

              <TableCell><strong>Status</strong></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {planets.map((planet, index) => (

              <TableRow
                key={planet.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/planet/${planet.id}`)}
              >

                <TableCell>
                  #{index + 1}
                </TableCell>

                <TableCell>
                  {planet.planet_name}
                </TableCell>

                <TableCell>
                  {planet.score}/100
                </TableCell>

                <TableCell>

                  <Chip

                    label={
                      planet.score >= 80
                        ? "Highly Habitable"
                        : planet.score >= 60
                        ? "Potentially Habitable"
                        : "Uninhabitable"
                    }

                    color={
                      planet.score >= 80
                        ? "success"
                        : planet.score >= 60
                        ? "warning"
                        : "error"
                    }

                  />

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  );

}

export default Habitability;