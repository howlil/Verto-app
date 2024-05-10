import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/landing-page/Home";
import { ActiveRouteProvider } from "./utils/ActiveRouteContex";
import Dashboard from "./pages/dashboard/Dashboard";
import Kriteria from "./pages/kriteria/Kriteria";
import NilaiKriteria from "./pages/nilai-kriteria/NilaiKriteria";
import Alternatif from "./pages/alternatif/Alternatif";
import { ProtectRoute } from "./utils/ProtectRoute";
import HasilAnalisis from "./pages/hasil-analisis/HasilAnalisis";
export default function App() {
  return (
    <>
      <Router>
        <ActiveRouteProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectRoute>
                  <Dashboard />
                </ProtectRoute>
              }
            />
            <Route
              path="/kriteria"
              element={
                <ProtectRoute>
                  <Kriteria />
                </ProtectRoute>
              }
            />
            <Route
              path="/nilaiKriteria"
              element={
                <ProtectRoute>
                  <NilaiKriteria />
                </ProtectRoute>
              }
            />
            <Route
              path="/alternatif"
              element={
                <ProtectRoute>
                  <Alternatif />
                </ProtectRoute>
              }
            />
            <Route
              path="/hasilAnalisis"
              element={
                <ProtectRoute>
                  <HasilAnalisis />
                </ProtectRoute>
              }
            />
          </Routes>
        </ActiveRouteProvider>
      </Router>
    </>
  );
}
