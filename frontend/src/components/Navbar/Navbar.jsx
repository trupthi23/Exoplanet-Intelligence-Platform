import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e293b",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          🌍 Exoplanet Intelligence Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;