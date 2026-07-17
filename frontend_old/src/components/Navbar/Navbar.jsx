import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

import PublicIcon from "@mui/icons-material/Public";

function Navbar() {

  return (

    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "linear-gradient(90deg,#0f172a,#1e293b,#334155)",
        borderBottom: "1px solid #334155",
      }}
    >

      <Toolbar>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >

          <PublicIcon
            sx={{
              fontSize: 34,
              color: "#38BDF8",
            }}
          />

          <Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              Exoplanet Intelligence Platform
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#CBD5E1",
              }}
            >
              NASA Exoplanet Analytics • ML • Habitability
            </Typography>

          </Box>

        </Box>

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;