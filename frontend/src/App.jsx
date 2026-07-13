import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import Compare from "./pages/Compare";
import Habitability from "./pages/Habitability";
import PlanetDetails from "./pages/PlanetDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            p: 4,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/explorer"
              element={<Explorer />}
            />

            <Route
              path="/compare"
              element={<Compare />}
            />

            <Route
              path="/habitability"
              element={<Habitability />}
            />

            <Route
              path="/planet/:id"
              element={<PlanetDetails />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;