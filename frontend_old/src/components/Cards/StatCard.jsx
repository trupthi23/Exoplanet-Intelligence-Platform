import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import CountUp from "react-countup";

import PublicIcon from "@mui/icons-material/Public";
import StarIcon from "@mui/icons-material/Star";
import StraightenIcon from "@mui/icons-material/Straighten";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

function StatCard({ title, value }) {

  const getIcon = () => {
    switch (title) {
      case "Planets":
        return <PublicIcon sx={{ fontSize: 42 }} />;

      case "Host Stars":
        return <StarIcon sx={{ fontSize: 42 }} />;

      case "Average Radius":
        return <StraightenIcon sx={{ fontSize: 42 }} />;

      case "Average Star Temperature":
        return <WbSunnyIcon sx={{ fontSize: 42 }} />;

      default:
        return <PublicIcon sx={{ fontSize: 42 }} />;
    }
  };

  // Convert value safely to a number
  let numericValue = 0;

  if (typeof value === "number") {
    numericValue = value;
  } else if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^\d.]/g, ""));
    numericValue = isNaN(parsed) ? 0 : parsed;
  }

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}
    >
      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography color="#CBD5E1">
              {title}
            </Typography>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              <CountUp
                end={numericValue}
                duration={2}
                decimals={Number.isInteger(numericValue) ? 0 : 2}
              />
            </Typography>

          </Box>

          <Box
            sx={{
              background: "#2563EB",
              borderRadius: "50%",
              p: 2,
              color: "white",
            }}
          >
            {getIcon()}
          </Box>

        </Box>

      </CardContent>
    </Card>
  );
}

export default StatCard;