import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import GlassCard from "../Common/GlassCard";

function ExplorerTable({
  planets,
  navigate,
  orderBy,
  order,
  handleSort,
}) {
  return (
    <GlassCard
      sx={{
        p: 0,
        overflow: "hidden",
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 700,
        }}
      >
        <Table stickyHeader>

          <TableHead>

            <TableRow>

              {[
                {
                  key: "planet_name",
                  label: "Planet",
                },
                {
                  key: "discovery_method",
                  label: "Discovery",
                },
                {
                  key: "discovery_year",
                  label: "Year",
                },
                {
                  key: "host_star",
                  label: "Host Star",
                },
                {
                  key: "planet_radius_earth",
                  label: "Radius",
                },
                {
                  key: "equilibrium_temperature",
                  label: "Temperature",
                },
              ].map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    background:
                      "rgba(15,23,42,.95)",

                    color: "#F8FAFC",

                    fontWeight: 700,

                    borderBottom:
                      "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={order}
                    onClick={() =>
                      handleSort(column.key)
                    }
                    sx={{
                      color: "#F8FAFC",

                      "&.Mui-active": {
                        color: "#60A5FA",
                      },

                      "& .MuiTableSortLabel-icon": {
                        color: "#60A5FA !important",
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}

            </TableRow>

          </TableHead>

          <TableBody>

            {planets.map((planet, index) => (

              <TableRow
                hover
                key={planet.id}
                onClick={() =>
                  navigate(`/planet/${planet.id}`)
                }
                sx={{
                  cursor: "pointer",

                  transition: ".25s",

                  background:
                    index % 2 === 0
                      ? "rgba(255,255,255,.015)"
                      : "transparent",

                  "&:hover": {
                    background:
                      "rgba(59,130,246,.12)",

                    transform: "scale(1.003)",
                  },
                }}
              >

                <TableCell
                  sx={{
                    color: "#F8FAFC",
                    fontWeight: 600,
                  }}
                >
                  {planet.planet_name}
                </TableCell>

                <TableCell>
                  {planet.discovery_method}
                </TableCell>

                <TableCell>
                  {planet.discovery_year}
                </TableCell>

                <TableCell>
                  {planet.host_star}
                </TableCell>

                <TableCell>
                  {planet.planet_radius_earth ?? "-"}
                </TableCell>

                <TableCell>
                  {planet.equilibrium_temperature ?? "-"}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>
    </GlassCard>
  );
}

export default ExplorerTable;