import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const cards = [
  {
    key: "results",
    title: "Results",
    icon: "🪐",
    color: "#2563EB",
  },
  {
    key: "methods",
    title: "Discovery Methods",
    icon: "🛰️",
    color: "#10B981",
  },
  {
    key: "stars",
    title: "Host Stars",
    icon: "⭐",
    color: "#F59E0B",
  },
  {
    key: "filters",
    title: "Active Filters",
    icon: "🎯",
    color: "#8B5CF6",
  },
];

function ExplorerStats({
  totalResults,
  totalMethods,
  totalStars,
  activeFilters,
}) {

  const values = {
    results: totalResults,
    methods: totalMethods,
    stars: totalStars,
    filters: activeFilters,
  };

  return (

    <Grid
      container
      spacing={3}
      sx={{ mb: 4 }}
    >

      {cards.map((card) => (

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          key={card.key}
        >

          <Card
            sx={{
              borderRadius: 3,
              background:
                "rgba(255,255,255,.04)",

              backdropFilter: "blur(18px)",

              border:
                `1px solid ${card.color}40`,

              transition: ".3s",

              "&:hover": {

                transform: "translateY(-6px)",

                boxShadow:
                  `0 0 25px ${card.color}55`,

              },

            }}
          >

            <CardContent>

              <Typography
                sx={{
                  fontSize: 36,
                }}
              >
                {card.icon}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: card.color,
                }}
              >
                {values[card.key]}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}

export default ExplorerStats;