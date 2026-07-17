import React, { memo } from "react";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function PlanetStatCard({
  title,
  value,
  unit,
}) {

  let displayValue = "-";

  if (value !== null && value !== undefined) {

    if (typeof value === "number") {

      displayValue = Number(value).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      );

    } else {

      displayValue = value;

    }

  }

  return (

    <Card
      sx={{
        borderRadius: 3,

        height: "100%",

        transition: "0.25s",

        "&:hover": {

          transform: "translateY(-4px)",

          boxShadow: 6,

        },
      }}
    >

      <CardContent>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          {displayValue}
        </Typography>

        {unit && (

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            {unit}
          </Typography>

        )}

      </CardContent>

    </Card>

  );

}

export default memo(PlanetStatCard);