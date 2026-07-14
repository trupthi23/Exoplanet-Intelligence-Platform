import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/explorer"
              element={<Explorer />}
            />

            <Route
              path="/planet/:id"
              element={<PlanetDetails />}
            />

            <Route
              path="/comparison/:id"
              element={<Compare />}
            />

            <Route
              path="/habitability"
              element={<Habitability />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;