import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import api from "../services/api";
import StatCard from "../components/Cards/StatCard";

function Home() {

    const [summary, setSummary] = useState(null);

    useEffect(() => {
        api.get("/analytics/summary")
            .then((res) => setSummary(res.data));
    }, []);

    if (!summary)
        return <h2>Loading...</h2>;

    return (

        <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatCard
                    title="Planets"
                    value={summary.total_planets}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatCard
                    title="Host Stars"
                    value={summary.total_host_stars}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatCard
                    title="Average Radius"
                    value={summary.average_radius.toFixed(2)}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <StatCard
                    title="Average Star Temp"
                    value={`${summary.average_star_temperature.toFixed(0)} K`}
                />
            </Grid>

        </Grid>

    );

}

export default Home;