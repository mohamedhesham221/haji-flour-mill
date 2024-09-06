import { createBrowserRouter } from "react-router-dom";

import Protected from "./components/Protected.js";

import MainLayout from "./components/layouts/MainLayout.js";
import UserLayout from "./components/layouts/UserLayout.js";
import AdminLayout from "./components/layouts/AdminLayout.js";

import Home from "./pages/main/Home.js";
import Services from "./pages/main/Services.js";
import Pricing from "./pages/main/Pricing.js";
import LoginUser from "./pages/main/LoginUser.js";
import LoginAdmin from "./pages/main/LoginAdmin.js";

import Profile from "./pages/user/Profile.js";
import Entries from "./pages/user/Entries.js";

import NewEntry from "./pages/admin/NewEntry.js";

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
        element: <LoginUser />
      },
      {
        path: "admin/login",
        element: <LoginAdmin />
      }
    ]
  },
  {
    path: "user",
    element: <Protected />,
    children: [
      {
        path: "",
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <Profile />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "entries",
            element: <Entries />
          }
        ]
      }
    ]
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <NewEntry />
      }
    ]
  },
  {
    path: "*",
    element: <h3>Error 404! Not Found.</h3>
  }
])