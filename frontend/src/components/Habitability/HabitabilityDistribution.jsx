import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function HabitabilityDistribution({ planets }) {

  const bins = [
    { range: "0-19", count: 0 },
    { range: "20-39", count: 0 },
    { range: "40-59", count: 0 },
    { range: "60-79", count: 0 },
    { range: "80-100", count: 0 },
  ];

  planets.forEach((planet) => {

    const score = planet.habitability;

    if (score < 20) bins[0].count++;
    else if (score < 40) bins[1].count++;
    else if (score < 60) bins[2].count++;
    else if (score < 80) bins[3].count++;
    else bins[4].count++;

  });

  return (

    <Card
      sx={{
        mt: 5,
        borderRadius: 2,
      }}
    >

      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
        >
          📊 Habitability Score Distribution
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Distribution of planets across habitability score ranges.
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={420}
        >

          <BarChart
            data={bins}
          >

            <CartesianGrid
              strokeDasharray="5 5"
              opacity={0.35}
            />

            <XAxis dataKey="range" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>

  );

}

export default HabitabilityDistribution;