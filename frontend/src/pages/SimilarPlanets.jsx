import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import api from "../services/api";

function SimilarPlanets() {

  const { id } = useParams();

  const [planets, setPlanets] = useState(null);

  useEffect(() => {

    api
      .get(`/planets/${id}/similar`)
      .then((res) => setPlanets(res.data));

  }, [id]);

  if (!planets)
    return <CircularProgress />;

  return (

    <Box>

      <Typography
        variant="h3"
        gutterBottom
      >
        🤖 Similar Planets
      </Typography>

      <Card>

        <CardContent>

          <List>

            {planets.map((planet) => (

              <ListItem key={planet.id}>

                <ListItemText
                  primary={planet.planet_name}
                  secondary={`Radius: ${planet.planet_radius_earth} | Temp: ${planet.equilibrium_temperature} K`}
                />

              </ListItem>

            ))}

          </List>

        </CardContent>

      </Card>

    </Box>

  );

}

export default SimilarPlanets;