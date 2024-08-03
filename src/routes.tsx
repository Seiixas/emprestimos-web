import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Simulation } from "./pages/Simulation/Simulation";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":simulationId" element={<Simulation />} />
      </Routes>
    </BrowserRouter>
  );
};
