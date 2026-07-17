import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Chip,
  LinearProgress,
  Box,
} from "@mui/material";

function PlanetIntelligenceCard({ intelligence }) {

  if (!intelligence) return null;

  return (

    <Card
      elevation={0}
      sx={{
        mt: 4,
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
          🧠 AI Planet Intelligence
        </Typography>

        <Typography
          variant="h5"
          color="primary"
          fontWeight={700}
        >
          {intelligence.title}
        </Typography>

        <Typography
          sx={{
            mt: 2,
            lineHeight: 1.8,
          }}
        >
          {intelligence.summary}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Confidence */}

        <Typography
          fontWeight={600}
          gutterBottom
        >
          Confidence Score
        </Typography>

        <LinearProgress

          variant="determinate"

          value={intelligence.confidence}

          sx={{
            height: 12,
            borderRadius: 6,
            mb: 1,
          }}

        />

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {intelligence.confidence}% confidence
        </Typography>

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={4}
        >

          {/* Strengths */}

          <Box flex={1}>

            <Typography
              variant="h6"
              gutterBottom
              color="success.main"
            >
              ✅ Strengths
            </Typography>

            <Stack spacing={1}>

              {intelligence.positives.length > 0 ? (

                intelligence.positives.map((item) => (

                  <Chip
                    key={item}
                    color="success"
                    label={item}
                  />

                ))

              ) : (

                <Typography
                  color="text.secondary"
                >
                  No significant strengths detected.
                </Typography>

              )}

            </Stack>

          </Box>

          {/* Concerns */}

          <Box flex={1}>

            <Typography
              variant="h6"
              gutterBottom
              color="warning.main"
            >
              ⚠ Potential Concerns
            </Typography>

            <Stack spacing={1}>

              {intelligence.concerns.length > 0 ? (

                intelligence.concerns.map((item) => (

                  <Chip
                    key={item}
                    color="warning"
                    label={item}
                  />

                ))

              ) : (

                <Typography
                  color="text.secondary"
                >
                  No significant concerns detected.
                </Typography>

              )}

            </Stack>

          </Box>

        </Stack>

      </CardContent>

    </Card>

  );

}

export default PlanetIntelligenceCard;