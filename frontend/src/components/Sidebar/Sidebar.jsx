import {
  List,
  ListItemButton,
  ListItemText,
  Paper
} from "@mui/material";

function Sidebar() {

  return (

    <Paper
      sx={{
        height: "100vh",
        width: 220
      }}
    >

      <List>

        <ListItemButton>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Planet Explorer" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Earth Comparison" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Habitability" />
        </ListItemButton>

      </List>

    </Paper>

  );

}

export default Sidebar;