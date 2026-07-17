import {
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PsychologyIcon from "@mui/icons-material/Psychology";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      text: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      text: "Explorer",
      path: "/explorer",
      icon: <PublicIcon />,
    },
    {
      text: "Compare",
      path: "/compare",
      icon: <CompareArrowsIcon />,
    },
    {
      text: "Habitability",
      path: "/habitability",
      icon: <PsychologyIcon />,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: {
          xs: 0,
          md: 220,
          lg: 240,
        },

        display: {
          xs: "none",
          md: "block",
        },

        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#0F172A,#111827)",

        borderRight: "1px solid rgba(255,255,255,.08)",

        borderRadius: 0,

        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom:
            "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#38BDF8",
            fontWeight: 700,
          }}
        >
          Navigation
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#94A3B8",
            mt: 0.5,
          }}
        >
          Explore the galaxy
        </Typography>
      </Box>

      <List sx={{ p: 2 }}>
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                mb: 1.5,

                borderRadius: 3,

                color: "white",

                transition: ".25s",

                backgroundColor: active
                  ? "#2563EB"
                  : "transparent",

                "&:hover": {
                  backgroundColor: active
                    ? "#2563EB"
                    : "#1E293B",

                  transform: "translateX(5px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: active ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}

export default Sidebar;