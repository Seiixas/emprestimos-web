import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/simulation",
    element: <div>About</div>,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export { Routes };
