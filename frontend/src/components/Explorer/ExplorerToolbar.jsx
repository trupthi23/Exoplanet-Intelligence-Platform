import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

function ExplorerToolbar({
  search,
  setSearch,
  method,
  setMethod,
  year,
  setYear,
  hostStar,
  setHostStar,
  methods,
  years,
}) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 4 }}
    >
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Search Planet"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          select
          label="Discovery Method"
          value={method}
          onChange={(e) =>
            setMethod(e.target.value)
          }
        >
          <MenuItem value="">
            All
          </MenuItem>

          {methods.map((m) => (
            <MenuItem
              key={m}
              value={m}
            >
              {m}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          select
          label="Discovery Year"
          value={year}
          onChange={(e) =>
            setYear(e.target.value)
          }
        >
          <MenuItem value="">
            All
          </MenuItem>

          {years.map((y) => (
            <MenuItem
              key={y}
              value={String(y)}
            >
              {y}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Host Star"
          value={hostStar}
          onChange={(e) =>
            setHostStar(e.target.value)
          }
        />
      </Grid>
    </Grid>
  );
}

export default ExplorerToolbar;