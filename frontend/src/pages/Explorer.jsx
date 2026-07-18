import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
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

function Explorer() {

  const navigate = useNavigate();

  const [planets, setPlanets] = useState([]);

  const [loading, setLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [method, setMethod] = useState("");

  const [year, setYear] = useState("");

  const [hostStar, setHostStar] = useState("");

  const [orderBy, setOrderBy] = useState("planet_name");

  const [order, setOrder] = useState("asc");

  const [methods, setMethods] = useState([]);

  const [years, setYears] = useState([]);

  useEffect(() => {

    setLoading(true);

    api.get("/planets/search", {

      params: {

        page,

        limit: 25,

        sort: orderBy,

        order,

        ...(search.trim() && {
          name: search.trim(),
        }),

        ...(method && {
          method,
        }),

        ...(year !== "" && {
          year: Number(year),
        }),

        ...(hostStar.trim() && {
          host_star: hostStar.trim(),
        }),

      },

    })

    .then((res) => {

      setPlanets(res.data.data);

      setTotal(res.data.total);

      setTotalPages(res.data.total_pages);

    })

    .catch(console.error)

    .finally(() => {

      setLoading(false);

      setInitialLoading(false);

    });

  }, [
    page,
    search,
    method,
    year,
    hostStar,
    orderBy,
    order,
  ]);

  useEffect(() => {

    api.get("/planets", {

      params: {
        page: 1,
        limit: 500,
      },

    })

    .then((res) => {

      const all = res.data.data;

      setMethods(

        [...new Set(

          all
            .map((p) => p.discovery_method)
            .filter(Boolean)

        )].sort()

      );

      setYears(

        [...new Set(

          all
            .map((p) => p.discovery_year)
            .filter(Boolean)

        )].sort((a, b) => b - a)

      );

    });

  }, []);

  function handleSort(column) {

    if (orderBy === column) {

      setOrder(order === "asc" ? "desc" : "asc");

    } else {

      setOrderBy(column);

      setOrder("asc");

    }

  }

  if (initialLoading) {

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
        Search, filter and explore NASA's confirmed exoplanets.
      </Typography>

      <ExplorerStats

        totalResults={total}

        totalMethods={methods.length}

        totalStars={
          new Set(
            planets
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

          setSearch={(value) => {

            setSearch(value);

            setPage(1);

          }}

          method={method}

          setMethod={(value) => {

            setMethod(value);

            setPage(1);

          }}

          year={year}

          setYear={(value) => {

            setYear(value);

            setPage(1);

          }}

          hostStar={hostStar}

          setHostStar={(value) => {

            setHostStar(value);

            setPage(1);

          }}

          methods={methods}

          years={years}

        />

        <Button

          variant="contained"

          startIcon={<DownloadIcon />}

          onClick={() => exportPlanetsCSV(planets)}

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

      {loading && (

        <Box
          display="flex"
          justifyContent="center"
          mb={2}
        >
          <CircularProgress size={28} />
        </Box>

      )}

      {planets.length === 0 ? (

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

          <Typography color="text.secondary">

            Try changing your filters.

          </Typography>

        </Box>

      ) : (

        <>

          <ExplorerTable

            planets={planets}

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