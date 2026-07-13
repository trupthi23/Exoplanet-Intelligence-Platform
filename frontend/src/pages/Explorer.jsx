import { useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";

import api from "../services/api";
import PlanetCard from "../components/Planet/PlanetCard";

function Explorer() {

    const [planets, setPlanets] = useState([]);

    useEffect(() => {

        api.get("/planets/search")
            .then((res) => {
                setPlanets(res.data);
            });

    }, []);

    return (

        <>

            <Typography
                variant="h4"
                gutterBottom
            >
                Planet Explorer
            </Typography>

            <TextField
                fullWidth
                placeholder="Search planets..."
                sx={{ mb: 4 }}
            />

            {planets.map((planet) => (

                <PlanetCard
                    key={planet.id}
                    planet={planet}
                />

            ))}

        </>

    );

}

export default Explorer;