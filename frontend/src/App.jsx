import { lazy, Suspense } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import StarBackground from "./components/Background/StarBackground";

import LoadingScreen from "./components/Common/LoadingScreen";

// ------------------------
// Lazy Loaded Pages
// ------------------------

const Home = lazy(() =>
  import("./pages/Home")
);

const Explorer = lazy(() =>
  import("./pages/Explorer")
);

const Compare = lazy(() =>
  import("./pages/Compare")
);

const Habitability = lazy(() =>
  import("./pages/Habitability")
);

const PlanetDetails = lazy(() =>
  import("./pages/PlanetDetails")
);

function App() {

  return (

    <BrowserRouter>

      {/* Animated Space Background */}

      <StarBackground />

      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          position: "relative",
          zIndex: 1,
        }}
      >

        <Sidebar />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >

          <main
            style={{
              flex: 1,
              padding: "30px",
            }}
          >

            <Suspense

              fallback={

                <LoadingScreen

                  title="Loading Page..."

                  subtitle="Preparing planetary intelligence..."

                />

              }

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

              </Routes>

            </Suspense>

          </main>

          <Footer />

        </div>

      </div>

    </BrowserRouter>

  );

}

export default App;