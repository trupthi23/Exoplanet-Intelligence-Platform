import { useEffect, useState } from "react";

import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import PublicIcon from "@mui/icons-material/Public";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const STORAGE_KEY = "recent_planet_searches";

function PlanetSearch() {

  const navigate = useNavigate();

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (inputValue.trim().length < 2) {

      const recent =
        JSON.parse(
          localStorage.getItem(STORAGE_KEY)
        ) || [];

      setOptions(Array.isArray(recent) ? recent : []);

      return;

    }

    const timer = setTimeout(() => {

      setLoading(true);

      api
        .get("/planets/search", {
          params: {
            name: inputValue,
            limit: 8,
          },
        })
        .then((res) => {

          // Backend returns:
          // {
          //   page,
          //   total,
          //   data:[...]
          // }

          const planets = Array.isArray(res.data?.data)
            ? res.data.data
            : [];

          setOptions(planets);

        })
        .catch((err) => {

          console.error(err);

          setOptions([]);

        })
        .finally(() => {

          setLoading(false);

        });

    }, 350);

    return () => clearTimeout(timer);

  }, [inputValue]);

  function saveRecent(planet) {

    let recent =
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || [];

    if (!Array.isArray(recent))
      recent = [];

    recent = recent.filter(
      (p) => p.id !== planet.id
    );

    recent.unshift(planet);

    recent = recent.slice(0, 5);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(recent)
    );

  }

  return (

    <Autocomplete

      sx={{ width: 380 }}

      options={options}

      value={value}

      loading={loading}

      inputValue={inputValue}

      noOptionsText="No planets found"

      getOptionLabel={(option) =>
        option?.planet_name ?? ""
      }

      isOptionEqualToValue={(option, value) =>
        option?.id === value?.id
      }

      onInputChange={(event, newValue) => {

        setInputValue(newValue);

      }}

      onChange={(event, planet) => {

        if (!planet) return;

        setValue(planet);

        saveRecent(planet);

        navigate(`/planet/${planet.id}`);

      }}

      renderInput={(params) => (

        <TextField

          {...params}

          placeholder="Search planets..."

          InputProps={{

            ...params.InputProps,

            startAdornment: (
              <>
                <SearchIcon
                  sx={{
                    mr: 1,
                    color: "#94A3B8",
                  }}
                />

                {params.InputProps.startAdornment}
              </>
            ),

            endAdornment: (
              <>
                {loading && (
                  <CircularProgress
                    size={18}
                  />
                )}

                {params.InputProps.endAdornment}
              </>
            ),

          }}

          sx={{

            "& .MuiOutlinedInput-root": {

              borderRadius: 4,

              background:
                "rgba(255,255,255,.04)",

            },

          }}

        />

      )}

      renderOption={(props, option) => {

        if (!option) return null;

        return (

          <li
            {...props}
            key={option.id}
          >

            <Box
              display="flex"
              alignItems="center"
              width="100%"
            >

              {inputValue.length < 2 ? (

                <HistoryIcon
                  sx={{
                    mr: 1,
                    color: "#38BDF8",
                  }}
                />

              ) : (

                <PublicIcon
                  sx={{
                    mr: 1,
                    color: "#22C55E",
                  }}
                />

              )}

              <Box>

                <Typography
                  fontWeight={600}
                >
                  {option.planet_name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {option.discovery_method}
                  {" • "}
                  {option.discovery_year}
                </Typography>

              </Box>

            </Box>

          </li>

        );

      }}

    />

  );

}

export default PlanetSearch;