import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

function LoadingScreen({
  title = "Loading NASA Archive...",
  subtitle = "Preparing Exoplanet Intelligence Dashboard..."
}) {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mb: 2,
        }}
      >
        🌌
      </Typography>

      <CircularProgress
        size={60}
        sx={{
          mb: 3,
        }}
      />

      <Typography
        variant="h5"
        fontWeight={700}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default LoadingScreen;