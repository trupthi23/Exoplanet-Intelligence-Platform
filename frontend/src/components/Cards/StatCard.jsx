import { Card, CardContent, Typography } from "@mui/material";
import CountUp from "react-countup";

function StatCard({ title, value }) {
  return (
    <Card
      sx={{
        height: 150,
        borderRadius: 3,
        transition: ".3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Typography
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          <CountUp
            end={Number(value) || 0}
            duration={2}
            separator=","
          />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;