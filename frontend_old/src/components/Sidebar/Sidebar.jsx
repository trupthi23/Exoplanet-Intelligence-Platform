import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
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
      icon: <DashboardIcon />,
      path: "/",
    },

    {
      text: "Planet Explorer",
      icon: <PublicIcon />,
      path: "/explorer",
    },

    {
      text: "Earth Comparison",
      icon: <CompareArrowsIcon />,
      path: "/compare/6990",
    },

    {
      text: "Habitability",
      icon: <PsychologyIcon />,
      path: "/habitability",
    },

  ];

  return (

    <Paper
      elevation={0}
      sx={{
        width: 250,
        minHeight: "100vh",
        background: "#111827",
        borderRight: "1px solid #334155",
      }}
    >

      <Typography
        variant="h6"
        sx={{
          p: 3,
          fontWeight: "bold",
          color: "#38BDF8",
        }}
      >
        Navigation
      </Typography>

      <List>

        {menu.map((item) => (

          <ListItemButton

            key={item.text}

            component={Link}

            to={item.path}

            selected={location.pathname === item.path}

            sx={{

              mx: 1,

              mb: 1,

              borderRadius: 3,

              "&.Mui-selected": {

                backgroundColor: "#2563EB",

              },

              "&.Mui-selected:hover": {

                backgroundColor: "#2563EB",

              },

              "&:hover": {

                backgroundColor: "#1E293B",

              },

            }}

          >

            <ListItemIcon
              sx={{
                color: "white",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />

          </ListItemButton>

        ))}

      </List>

    </Paper>

  );

}

export default Sidebar;