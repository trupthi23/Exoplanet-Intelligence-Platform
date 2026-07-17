import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import PlanetSearch from "../Search/PlanetSearch";

function Navbar() {

  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (

    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(15,23,42,0.72)",

        backdropFilter: "blur(16px)",

        WebkitBackdropFilter: "blur(16px)",

        borderBottom: "1px solid rgba(255,255,255,.08)",

        boxShadow: "0 8px 32px rgba(0,0,0,.25)",
      }}
    >

      <Toolbar

        sx={{

          justifyContent: "space-between",

          gap: {
            xs: 1,
            sm: 2,
            md: 3,
          },

          minHeight: {
            xs: 72,
            md: 82,
          },

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

        }}

      >

        {/* LEFT */}

        <Box

          display="flex"

          alignItems="center"

          gap={2}

          sx={{

            flexShrink: 0,

            minWidth: 0,

          }}

        >

          <RocketLaunchIcon

            sx={{

              color: "#60A5FA",

              fontSize: {

                xs: 28,

                md: 34,

              },

            }}

          />

          <Box>

            <Typography

              fontWeight={700}

              noWrap

              sx={{

                fontSize: {

                  xs: "1rem",

                  sm: "1.2rem",

                  md: "1.45rem",

                },

                lineHeight: 1.2,

              }}

            >

              {isMobile

                ? "Exoplanet Intelligence"

                : "Exoplanet Intelligence Platform"}

            </Typography>

            <Typography

              variant="caption"

              noWrap

              sx={{

                display: {

                  xs: "none",

                  sm: "block",

                },

                color: "#94A3B8",

                fontSize: {

                  sm: ".72rem",

                  md: ".78rem",

                },

              }}

            >

              NASA Exoplanet Discovery & Habitability Analytics

            </Typography>

          </Box>

        </Box>

        {/* CENTER */}

        <Box

          sx={{

            flex: 1,

            display: "flex",

            justifyContent: "center",

            minWidth: 0,

            mx: {

              xs: 1,

              md: 3,

            },

          }}

        >

          <PlanetSearch />

        </Box>

        {/* RIGHT */}

        <Chip

          label={isTablet ? "NASA" : "NASA Archive"}

          size={isTablet ? "small" : "medium"}

          sx={{

            background:

              "linear-gradient(90deg,#2563EB,#3B82F6)",

            color: "white",

            fontWeight: 700,

            letterSpacing: ".5px",

            flexShrink: 0,

            boxShadow:

              "0 0 15px rgba(59,130,246,.45)",

            transition: ".25s",

            "&:hover": {

              transform: "translateY(-2px)",

              boxShadow:

                "0 0 20px rgba(59,130,246,.65)",

            },

          }}

        />

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;