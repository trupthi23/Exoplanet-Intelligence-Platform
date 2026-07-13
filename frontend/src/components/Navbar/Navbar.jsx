import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          🚀 Exoplanet Intelligence Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;