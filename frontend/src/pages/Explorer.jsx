import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import ExplorerToolbar from "../components/Explorer/ExplorerToolbar";
import ExplorerTable from "../components/Explorer/ExplorerTable";
import ExplorerPagination from "../components/Explorer/ExplorerPagination";
import ExplorerStats from "../components/Explorer/ExplorerStats";

import LoadingScreen from "../components/Common/LoadingScreen";

import { exportPlanetsCSV } from "../utils/csvGenerator";

const ROWS_PER_PAGE = 25;

function Explorer() {

  const navigate = useNavigate();

  const [planets, setPlanets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("");
  const [year, setYear] = useState("");
  const [hostStar, setHostStar] = useState("");

  const [page, setPage] = useState(1);

  const [orderBy, setOrderBy] =
    useState("planet_name");

  const [order, setOrder] =
    useState("asc");

  useEffect(() => {

    api
      .get("/planets")
      .then((res) => {

        setPlanets(res.data.data);

      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, []);

  useEffect(() => {

    let result = [...planets];

    if (search) {

      result = result.filter((planet) =>
        planet.planet_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    if (method) {

      result = result.filter(
        (planet) =>
          planet.discovery_method === method
      );

    }

    if (year) {

      result = result.filter(
        (planet) =>
          String(planet.discovery_year) === year
      );

    }

    if (hostStar) {

      result = result.filter((planet) =>
        planet.host_star
          ?.toLowerCase()
          .includes(hostStar.toLowerCase())
      );

    }

    result.sort((a, b) => {

      const first = a[orderBy];
      const second = b[orderBy];

      if (first == null) return 1;
      if (second == null) return -1;

      if (typeof first === "number") {

        return order === "asc"
          ? first - second
          : second - first;

      }

      return order === "asc"
        ? String(first).localeCompare(
            String(second)
          )
        : String(second).localeCompare(
            String(first)
          );

    });

    setFiltered(result);

    setPage(1);

  }, [
    planets,
    search,
    method,
    year,
    hostStar,
    orderBy,
    order,
  ]);

  const methods = [

    ...new Set(

      planets
        .map((p) => p.discovery_method)
        .filter(Boolean)

    ),

  ].sort();

  const years = [

    ...new Set(

      planets
        .map((p) => p.discovery_year)
        .filter(Boolean)

    ),

  ].sort((a, b) => b - a);

  const totalPages = Math.ceil(
    filtered.length / ROWS_PER_PAGE
  );

  const currentPageData = useMemo(() => {

    const start =
      (page - 1) * ROWS_PER_PAGE;

    return filtered.slice(
      start,
      start + ROWS_PER_PAGE
    );

  }, [filtered, page]);

  function handleSort(column) {

    if (orderBy === column) {

      setOrder(
        order === "asc"
          ? "desc"
          : "asc"
      );

    } else {

      setOrderBy(column);

      setOrder("asc");

    }

  }

  if (loading) {

    return (

      <LoadingScreen
        title="Loading Explorer..."
        subtitle="Fetching confirmed exoplanets..."
      />

    );

  }

  return (

    <Box>

      <Typography
        variant="h3"
        gutterBottom
      >
        🌍 Planet Explorer
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Search, filter and explore
        NASA's confirmed exoplanets.
      </Typography>

      <ExplorerStats

        totalResults={filtered.length}

        totalMethods={methods.length}

        totalStars={
          new Set(
            filtered
              .map((p) => p.host_star)
              .filter(Boolean)
          ).size
        }

        activeFilters={
          [
            search,
            method,
            year,
            hostStar,
          ].filter(Boolean).length
        }

      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >

        <ExplorerToolbar

          search={search}
          setSearch={setSearch}

          method={method}
          setMethod={setMethod}

          year={year}
          setYear={setYear}

          hostStar={hostStar}
          setHostStar={setHostStar}

          methods={methods}

          years={years}

        />

        <Button

          variant="contained"

          startIcon={<DownloadIcon />}

          onClick={() =>
            exportPlanetsCSV(filtered)
          }

          sx={{
            ml: 3,
            whiteSpace: "nowrap",
            borderRadius: 3,
            px: 3,
            py: 1.3,
            fontWeight: 700,
          }}

        >

          Export CSV

        </Button>

      </Stack>

      {filtered.length === 0 ? (

        <Box
          sx={{
            py: 10,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h1"
            sx={{ mb: 2 }}
          >
            🪐
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
          >
            No planets found
          </Typography>

          <Typography
            color="text.secondary"
          >
            Try changing your search,
            host star, discovery
            method or year.
          </Typography>

        </Box>

      ) : (

        <>

          <ExplorerTable

            planets={currentPageData}

            navigate={navigate}

            order={order}

            orderBy={orderBy}

            handleSort={handleSort}

          />

          <ExplorerPagination

            page={page}

            totalPages={totalPages}

            setPage={setPage}

          />

        </>

      )}

    </Box>

  );

}

export default Explorer;