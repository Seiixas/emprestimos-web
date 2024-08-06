import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Simulation } from "./pages/Simulation/Simulation";
import { NotFound } from "./pages/404/NotFound";
import { Success } from "./pages/Success/Success";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":simulationId" element={<Simulation />} />
        <Route path="/success/:id" element={<Success />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
