import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";

import api from "../services/api";

import LoadingScreen from "../components/Common/LoadingScreen";

import StatCard from "../components/Cards/StatCard";
import DiscoveryTimeline from "../components/Charts/DiscoveryTimeline";
import DiscoveryMethods from "../components/Charts/DiscoveryMethods";
import TopHostStars from "../components/Charts/TopHostStars";
import AIInsights from "../components/Dashboard/AIInsights";
import { generateDashboardInsights } from "../utils/dashboardInsights";
import MissionControl from "../components/MissionControl/MissionControl";

function Home() {

  const [summary, setSummary] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [methods, setMethods] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {

    Promise.all([
      api.get("/analytics/summary"),
      api.get("/analytics/discovery-timeline"),
      api.get("/analytics/discovery-methods"),
      api.get("/analytics/top-host-stars"),
    ])

      .then(([summaryRes, timelineRes, methodsRes, starsRes]) => {

        setSummary(summaryRes.data);
        setTimeline(timelineRes.data);
        setMethods(methodsRes.data);
        setStars(starsRes.data);

      })

      .catch(console.error);

  }, []);

  const insights =
    generateDashboardInsights(
      summary,
      methods,
      timeline,
      stars
    );

  if (!summary) {

    return (

      <LoadingScreen
        title="Loading NASA Archive..."
        subtitle="Preparing Exoplanet Intelligence Dashboard..."
      />

    );

  }

  return (

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      transition={{ duration: .7 }}

    >

      <Box>

        {/* HERO */}

        <Box
          sx={{
            mb: 6,

            textAlign: {
              xs: "center",
              md: "left",
            },
          }}
        >

          <Typography

            sx={{
              fontWeight: 800,

              fontSize: {
                xs: "2.2rem",
                sm: "2.8rem",
                md: "3.4rem",
              },

              mb: 1,
            }}

          >

            🚀 Exoplanet Intelligence Dashboard

          </Typography>

          <Typography

            variant="h6"

            color="primary"

            sx={{
              fontWeight: 600,
              mb: 2,
            }}

          >

            NASA Exoplanet Discovery &
            Habitability Intelligence Platform

          </Typography>

          <Typography

            color="text.secondary"

            sx={{
              maxWidth: 850,
              lineHeight: 1.8,
              fontSize: "1.05rem",
            }}

          >

            Explore

            {" "}

            <strong>

              {summary.total_planets.toLocaleString()}

            </strong>

            {" "}

            confirmed exoplanets using interactive analytics,
            discovery trends, host star intelligence,
            and AI-powered habitability scoring.

          </Typography>

        </Box>

        {/* KPI CARDS */}

        <Grid container spacing={3}>

          {[
            {
              icon: "🪐",
              title: "Total Planets",
              value: summary.total_planets,
              subtitle: "NASA Archive",
            },
            {
              icon: "⭐",
              title: "Host Stars",
              value: summary.total_host_stars,
              subtitle: "Unique Stellar Systems",
            },
            {
              icon: "🌍",
              title: "Average Radius",
              value: summary.average_radius,
              subtitle: "Earth Radii",
            },
            {
              icon: "☀️",
              title: "Average Star Temperature",
              value: summary.average_star_temperature,
              subtitle: "Kelvin",
            },
          ].map((card, index) => (

            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={card.title}
            >

              <motion.div

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: index * .12,
                  duration: .5,
                }}

                viewport={{
                  once: true,
                }}

              >

                <StatCard

                  icon={card.icon}

                  title={card.title}

                  value={card.value}

                  subtitle={card.subtitle}

                />

              </motion.div>

            </Grid>

          ))}

        </Grid>

         {/* DISCOVERY TIMELINE */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
          }}

          viewport={{
            once: true,
          }}

        >

          <Paper

            elevation={0}

            sx={{

              p: {
                xs: 2,
                md: 4,
              },

              mt: 6,

              borderRadius: 4,

              background:
                "rgba(255,255,255,0.03)",

              backdropFilter: "blur(12px)",

              border:
                "1px solid rgba(255,255,255,.08)",

              transition: ".35s",

              "&:hover": {

                boxShadow:
                  "0 0 40px rgba(37,99,235,.35)",

                transform: "translateY(-6px)",

              },

            }}

          >

            <Typography

              variant="h5"

              fontWeight={700}

              gutterBottom

            >

              📈 Discovery Timeline

            </Typography>

            <Typography

              color="text.secondary"

              sx={{
                mb: 3,
              }}

            >

              Visualizes the annual growth of confirmed
              exoplanet discoveries in NASA's archive,
              highlighting major discovery periods and
              the rapid acceleration of exoplanet research.

            </Typography>

            <DiscoveryTimeline
              data={timeline}
            />

          </Paper>

        </motion.div>


        {/* DISCOVERY METHODS */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: .6,
            delay: .15,
          }}

          viewport={{
            once: true,
          }}

        >

          <Paper

            elevation={0}

            sx={{

              p: {
                xs: 2,
                md: 4,
              },

              mt: 5,

              borderRadius: 4,

              background:
                "rgba(255,255,255,.03)",

              backdropFilter:
                "blur(12px)",

              border:
                "1px solid rgba(255,255,255,.08)",

              transition: ".35s",

              "&:hover": {

                boxShadow:
                  "0 0 40px rgba(37,99,235,.35)",

                transform:
                  "translateY(-6px)",

              },

            }}

          >

            <Typography

              variant="h5"

              fontWeight={700}

              gutterBottom

            >

              🛰 Discovery Methods

            </Typography>

            <Typography

              color="text.secondary"

              sx={{
                mb: 3,
              }}

            >

              Compare the techniques astronomers use to
              detect exoplanets including Transit,
              Radial Velocity, Imaging, Microlensing,
              Timing Variations and more.

            </Typography>

            <DiscoveryMethods
              data={methods}
            />

          </Paper>

        </motion.div>

                {/* TOP HOST STARS */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: .6,
            delay: .25,
          }}

          viewport={{
            once: true,
          }}

        >

          <Paper

            elevation={0}

            sx={{

              p: {
                xs: 2,
                md: 4,
              },

              mt: 5,
              mb: 6,

              borderRadius: 4,

              background:
                "rgba(255,255,255,.03)",

              backdropFilter:
                "blur(12px)",

              border:
                "1px solid rgba(255,255,255,.08)",

              transition: ".35s",

              "&:hover": {

                boxShadow:
                  "0 0 40px rgba(37,99,235,.35)",

                transform:
                  "translateY(-6px)",

              },

            }}

          >

            <Typography

              variant="h5"

              fontWeight={700}

              gutterBottom

            >

              ⭐ Top Host Stars

            </Typography>

            <Typography

              color="text.secondary"

              sx={{
                mb: 3,
              }}

            >

              Discover the stellar systems that host the
              largest number of confirmed exoplanets,
              revealing the most planet-rich stars known
              in our galaxy.

            </Typography>

            <TopHostStars
              data={stars}
            />

            <AIInsights
              insights={insights}
            />
            
            <MissionControl />

          </Paper>

        </motion.div>

      </Box>

    </motion.div>

  );

}

export default Home;