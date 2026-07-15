import {
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
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
        width: 240,
        minHeight: "100vh",
        backgroundColor: "#111827",
        borderRadius: 0,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 3,
          color: "#38BDF8",
          fontWeight: "bold",
        }}
      >
        Navigation
      </Typography>

      <List>
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 2,

                backgroundColor: active
                  ? "#2563EB"
                  : "transparent",

                "&:hover": {
                  backgroundColor: active
                    ? "#2563EB"
                    : "#1E293B",
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

              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}

export default Sidebar;