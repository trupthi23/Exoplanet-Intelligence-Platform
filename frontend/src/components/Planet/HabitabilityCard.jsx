import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

function HabitabilityCard({ score }) {

  let color = "error";
  let label = "Low Habitability";

  if (score >= 80) {
    color = "success";
    label = "Excellent Candidate";
  } else if (score >= 60) {
    color = "primary";
    label = "Potentially Habitable";
  } else if (score >= 40) {
    color = "warning";
    label = "Moderate";
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        mb: 4,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
        >
          Habitability Score
        </Typography>

        <Typography
          variant="h2"
          fontWeight={700}
          color={`${color}.main`}
        >
          {score}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          out of 100
        </Typography>

        <Chip
          label={label}
          color={color}
        />

      </CardContent>
    </Card>
  );
}

export default HabitabilityCard;