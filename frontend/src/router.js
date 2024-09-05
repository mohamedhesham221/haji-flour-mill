import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout.js";
import UserLayout from "./components/layouts/UserLayout.js";
import AdminLayout from "./components/layouts/AdminLayout.js";
import Home from "./pages/main/Home.js";
import Services from "./pages/main/Services.js";
import Pricing from "./pages/main/Pricing.js";
import Login from "./pages/main/Login.js";
import Profile from "./pages/user/Profile.js";

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
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Profile />
      },
      {
        path: "profile",
        element: <Profile />
      }
      
    ]
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