import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout.js";
import UserLayout from "./components/layouts/UserLayout.js";
import AdminLayout from "./components/layouts/AdminLayout.js";
import Home from "./pages/Home.js";
import Services from "./pages/Services.js";
import Pricing from "./pages/Pricing.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "services",
        element: <Services />
      },
      {
        path: "pricing",
        element: <Pricing />
      }
    ]
  },
  {
    path: "user",
    element: <UserLayout />
  },
  {
    path: "admin",
    element: <AdminLayout />
  },
  {
    path: "*",
    element: <h3>Error 404! Not Found.</h3>
  }
])