import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Chip,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

import GlassCard from "../Common/GlassCard";

function HabitabilityTable({ planets }) {
  return (
    <GlassCard
      sx={{
        mt: 5,
        p: 0,
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 4 }}>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          🏆 Top Ranked Exoplanets
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 3 }}
        >
          Ranked using the custom habitability scoring algorithm.
        </Typography>

      </Box>

      <TableContainer
        sx={{
          maxHeight: 650,
        }}
      >
        <Table stickyHeader>

          <TableHead>

            <TableRow>

              {[
                "Rank",
                "Planet",
                "Host Star",
                "Score",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    background:
                      "rgba(15,23,42,.95)",

                    color: "#F8FAFC",

                    fontWeight: 700,

                    borderBottom:
                      "1px solid rgba(255,255,255,.08)",
                  }}
                  align={
                    header === "Action"
                      ? "center"
                      : "left"
                  }
                >
                  {header}
                </TableCell>
              ))}

            </TableRow>

          </TableHead>

          <TableBody>

            {planets.map((planet, index) => {

              const medal =
                index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : index + 1;

              return (

                <TableRow
                  key={planet.id}
                  hover
                  sx={{
                    transition: ".25s",

                    cursor: "pointer",

                    background:
                      index % 2 === 0
                        ? "rgba(255,255,255,.015)"
                        : "transparent",

                    "&:hover": {
                      background:
                        "rgba(59,130,246,.12)",

                      transform:
                        "scale(1.003)",
                    },
                  }}
                >

                  <TableCell
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    {medal}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {planet.planet_name}
                  </TableCell>

                  <TableCell>
                    {planet.host_star}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={`${planet.habitability}/100`}
                      sx={{
                        fontWeight: 700,

                        color: "white",

                        background:
                          planet.habitability >= 80
                            ? "#10B981"
                            : planet.habitability >= 60
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    />

                  </TableCell>

                  <TableCell align="center">

                    <Button
                      component={Link}
                      to={`/planet/${planet.id}`}
                      variant="contained"
                      sx={{
                        borderRadius: 3,

                        textTransform: "none",

                        background:
                          "linear-gradient(90deg,#2563EB,#3B82F6)",

                        "&:hover": {
                          background:
                            "linear-gradient(90deg,#1D4ED8,#2563EB)",
                        },
                      }}
                    >
                      View Planet
                    </Button>

                  </TableCell>

                </TableRow>

              );

            })}

          </TableBody>

        </Table>

      </TableContainer>

    </GlassCard>
  );
}

export default HabitabilityTable;