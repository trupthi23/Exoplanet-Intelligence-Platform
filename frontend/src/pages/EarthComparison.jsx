import { useParams } from "react-router-dom";

import {
  Typography,
  Box
} from "@mui/material";

function EarthComparison() {

  const { id } = useParams();

  return (

    <Box sx={{ p:4 }}>

      <Typography variant="h3">

        🌍 Earth Comparison

      </Typography>

      <Typography sx={{ mt:2 }}>

        Planet ID : {id}

      </Typography>

      <Typography sx={{ mt:2 }}>

        Earth comparison coming in next phase...

      </Typography>

    </Box>

  );

}

export default EarthComparison;