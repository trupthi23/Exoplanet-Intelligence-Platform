import { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  MenuItem,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";

import api from "../services/api";
import PlanetCard from "../components/Planet/PlanetCard";

function Explorer() {
  const [planets, setPlanets] = useState([]);

  const [search, setSearch] = useState("");

  const [method, setMethod] = useState("");

  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get(
        `/planets/search?name=${search}&method=${method}&year=${year}`
      )
      .then((res) => {
        setPlanets(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, method, year]);

  return (
    <Box>

      <Typography
        variant="h4"
        gutterBottom
      >
        Planet Explorer
      </Typography>

      {/* Search Box */}

      <TextField
        fullWidth
        placeholder="Search planets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Filters */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Discovery Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Transit">Transit</MenuItem>
            <MenuItem value="Radial Velocity">
              Radial Velocity
            </MenuItem>
            <MenuItem value="Imaging">
              Imaging
            </MenuItem>
            <MenuItem value="Microlensing">
              Microlensing
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Discovery Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Loading */}

      {loading && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* No Results */}

      {!loading && planets.length === 0 && (
        <Typography align="center">
          No planets found.
        </Typography>
      )}

      {/* Planet Cards */}

      {!loading &&
        planets.map((planet) => (
          <PlanetCard
            key={planet.id}
            planet={planet}
          />
        ))}
    </Box>
  );
}

export default Explorer;