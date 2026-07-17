import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Fade,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

function AIInsights({ insights }) {
  if (!insights || insights.length === 0) {
    return null;
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "▲":
        return (
          <TrendingUpIcon
            sx={{
              color: "#22C55E",
              fontSize: 28,
            }}
          />
        );

      case "▼":
        return (
          <TrendingDownIcon
            sx={{
              color: "#EF4444",
              fontSize: 28,
            }}
          />
        );

      default:
        return (
          <TrendingFlatIcon
            sx={{
              color: "#38BDF8",
              fontSize: 28,
            }}
          />
        );
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "High":
        return "success";

      case "Medium":
        return "primary";

      default:
        return "default";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 6,
        p: 4,
        borderRadius: 5,

        background:
          "linear-gradient(145deg, rgba(20,25,40,.92), rgba(12,18,30,.95))",

        border: "1px solid rgba(56,189,248,.15)",

        backdropFilter: "blur(20px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
        }}
      >
        <SmartToyIcon
          sx={{
            color: "#38BDF8",
            mr: 1,
            fontSize: 34,
          }}
        />

        <Typography
          variant="h4"
          fontWeight={700}
        >
          AI Observatory Insights
        </Typography>
      </Box>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        AI-generated observations based on the current NASA
        Exoplanet Archive.
      </Typography>

      <Grid container spacing={3}>
        {insights.map((item, index) => (
          <Grid
            item
            xs={12}
            md={6}
            key={index}
          >
            <Fade
              in
              timeout={600 + index * 200}
            >
              <Card
                sx={{
                  height: "100%",

                  borderRadius: 3,

                  background:
                    "rgba(255,255,255,.04)",

                  backdropFilter: "blur(18px)",

                  border:
                    "1px solid rgba(56,189,248,.15)",

                  transition: ".35s",

                  "&:hover": {
                    transform: "translateY(-8px)",

                    boxShadow:
                      "0 0 30px rgba(56,189,248,.35)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 34,
                          mr: 2,
                        }}
                      >
                        {item.icon}
                      </Typography>

                      <Typography
                        variant="h6"
                        fontWeight={700}
                      >
                        {item.title}
                      </Typography>
                    </Box>

                    {getTrendIcon(item.trend)}
                  </Box>

                  <Typography
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      mb: 3,
                    }}
                  >
                    {item.text}
                  </Typography>

                  <Typography
                    fontWeight={600}
                    gutterBottom
                  >
                    AI Confidence
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={item.confidence}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      mb: 1.5,
                    }}
                  />

                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 3,
                    }}
                  >
                    {item.confidence}% confidence
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label={`${item.importance} Priority`}
                      color={getImportanceColor(
                        item.importance
                      )}
                    />

                    <Typography
                      color="primary"
                      fontWeight={700}
                    >
                      AI Verified ✓
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default AIInsights;