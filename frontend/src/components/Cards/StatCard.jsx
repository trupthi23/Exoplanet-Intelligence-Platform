import React, { memo } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import CountUp from "react-countup";

function StatCard({
  icon,
  title,
  value,
  subtitle,
}) {

  return (

    <Card
      sx={{

        height: "100%",

        borderRadius: 3,

        transition: "all .3s ease",

        cursor: "pointer",

        background:
          "rgba(255,255,255,.05)",

        backdropFilter: "blur(15px)",

        border:
          "1px solid rgba(255,255,255,.08)",

        "&:hover": {

          transform: "translateY(-8px)",

          boxShadow:
            "0 18px 45px rgba(37,99,235,.35)",

          border:
            "1px solid rgba(59,130,246,.35)",

        },

      }}
    >

      <CardContent>

        <Box
          sx={{
            fontSize: 36,
            mb: 2,
          }}
        >
          {icon}
        </Box>

        <Typography
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
        >

          {typeof value === "number" ? (

            <CountUp
              end={value}
              duration={2}
              separator=","
              decimals={
                Number.isInteger(value)
                  ? 0
                  : 1
              }
            />

          ) : (

            value

          )}

        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
          }}
        >
          {subtitle}
        </Typography>

      </CardContent>

    </Card>

  );

}

export default memo(StatCard);