import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

const systems = [

  {
    name: "AI Engine",
    status: "ONLINE",
    icon: "🤖",
    color: "#22C55E",
  },

  {
    name: "NASA Database",
    status: "CONNECTED",
    icon: "🛰",
    color: "#3B82F6",
  },

  {
    name: "Habitability AI",
    status: "ACTIVE",
    icon: "🌍",
    color: "#10B981",
  },

  {
    name: "Planet Explorer",
    status: "READY",
    icon: "🪐",
    color: "#6366F1",
  },

  {
    name: "Comparison Engine",
    status: "READY",
    icon: "⚖️",
    color: "#8B5CF6",
  },

  {
    name: "Analytics Core",
    status: "RUNNING",
    icon: "📊",
    color: "#F59E0B",
  },

];

function MissionControl() {

  const [uptime, setUptime] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setUptime((prev) => prev + 1);

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const currentTime =
    new Date().toLocaleTimeString();

  return (

    <Paper
      elevation={0}
      sx={{
        mt: 6,
        p: 4,
        borderRadius: 4,
        background: "rgba(255,255,255,.03)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >

      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={4}
      >

        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            🚀 AI Mission Control
          </Typography>

          <Typography color="text.secondary">

            Live operational status of the Exoplanet Intelligence Platform.

          </Typography>

        </Box>

        <Box textAlign="right">

          <Typography fontWeight={700}>

            ⏱ Uptime

          </Typography>

          <Typography color="primary">

            {uptime}s

          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >

            Last Update

          </Typography>

          <Typography>

            {currentTime}

          </Typography>

        </Box>

      </Box>

      <Grid container spacing={3}>

        {systems.map((system) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={system.name}
          >

            <Card
              sx={{
                borderRadius: 3,
                background:
                  "rgba(255,255,255,.04)",

                border:
                  `1px solid ${system.color}40`,

                transition: ".35s",

                "&:hover": {

                  transform: "translateY(-8px)",

                  boxShadow:
                    `0 0 30px ${system.color}55`,

                },

              }}
            >

              <CardContent>

                <Typography
                  sx={{
                    fontSize: 36,
                  }}
                >
                  {system.icon}
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  mt={1}
                >
                  {system.name}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  mt={2}
                >

                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: system.color,

                      mr: 1.5,

                      animation:
                        "pulse 1.5s infinite",
                    }}
                  />

                  <Typography
                    fontWeight={700}
                    sx={{
                      color: system.color,
                    }}
                  >

                    {system.status}

                  </Typography>

                </Box>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

      <style>

        {`

          @keyframes pulse{

            0%{
              transform:scale(.8);
              opacity:.5;
            }

            50%{
              transform:scale(1.3);
              opacity:1;
            }

            100%{
              transform:scale(.8);
              opacity:.5;
            }

          }

        `}

      </style>

    </Paper>

  );

}

export default MissionControl;