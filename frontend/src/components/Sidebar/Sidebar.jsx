import {
  List,
  ListItemButton,
  ListItemText,
  Paper
} from "@mui/material";

import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <Paper
      sx={{
        height: "100vh",
        width: 220
      }}
    >

      <List>

        <ListItemButton component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/explorer">
          <ListItemText primary="Planet Explorer" />
        </ListItemButton>

        <ListItemButton component={Link} to="/compare">
          <ListItemText primary="Earth Comparison" />
        </ListItemButton>

        <ListItemButton component={Link} to="/habitability">
          <ListItemText primary="Habitability" />
        </ListItemButton>

      </List>

    </Paper>

  );

}

export default Sidebar;