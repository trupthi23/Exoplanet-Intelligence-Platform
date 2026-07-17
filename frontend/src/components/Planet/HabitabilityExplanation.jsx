import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Box,
  Divider,
} from "@mui/material";

function HabitabilityExplanation({ explanation }) {

  if (!explanation) return null;

  return (

    <Card
      elevation={0}
      sx={{
        mt: 5,
        mb: 5,
        borderRadius: 4,

        background:
          "rgba(255,255,255,.04)",

        backdropFilter:
          "blur(12px)",

        border:
          "1px solid rgba(255,255,255,.08)",
      }}
    >

      <CardContent>

        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          🧠 AI Habitability Explanation
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Every habitability score is calculated using multiple
          planetary characteristics. Below is the contribution of
          each factor.
        </Typography>

        <Stack spacing={4}>

          {explanation.breakdown.map((item) => (

            <Box key={item.title}>

              <Stack
                direction="row"
                justifyContent="space-between"
                mb={1}
              >

                <Typography
                  fontWeight={700}
                >
                  {item.title}
                </Typography>

                <Typography
                  color="primary"
                  fontWeight={700}
                >
                  +{item.score}
                </Typography>

              </Stack>

              <LinearProgress
                variant="determinate"
                value={(item.score / 25) * 100}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  mb: 1.5,
                }}
              />

              <Typography
                color="text.secondary"
              >
                {item.reason}
              </Typography>

            </Box>

          ))}

        </Stack>

        <Divider sx={{ my: 4 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
        >

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Overall Score
          </Typography>

          <Typography
            variant="h4"
            color="primary"
            fontWeight={700}
          >
            {explanation.total}/100
          </Typography>

        </Stack>

      </CardContent>

    </Card>

  );

}

export default HabitabilityExplanation;