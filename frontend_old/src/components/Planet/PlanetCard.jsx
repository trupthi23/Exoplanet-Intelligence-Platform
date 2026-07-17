import {
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";

function PlanetCard({ planet }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>

        <Typography variant="h5">
          {planet.planet_name}
        </Typography>

        <Typography color="text.secondary">
          Host Star: {planet.host_star}
        </Typography>

        <Typography>
          Discovery Method: {planet.discovery_method}
        </Typography>

        <Typography>
          Radius: {planet.planet_radius_earth ?? "Unknown"} Earth
        </Typography>

        <Typography>
          Mass: {planet.planet_mass_earth ?? "Unknown"} Earth
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to={`/planet/${planet.id}`}
        >
          View Details
        </Button>

      </CardContent>
    </Card>
  );
}

export default PlanetCard;