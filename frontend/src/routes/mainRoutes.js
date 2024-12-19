// All routes related to MainLayout (home route).
import MainLayout from "../components/layouts/MainLayout.js";

import Home from "../pages/main/Home.js";
import Services from "../pages/main/Services.js";
import Pricing from "../pages/main/Pricing.js";
import ContactUs from "../pages/main/ContactUs.js";
import LoginUser from "../pages/main/LoginUser.js";
import LoginAdmin from "../pages/main/LoginAdmin.js";
import ServiceReviews from "../pages/main/ServiceReviews.js";

const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "services",
      element: <Services />,
    },
    {
      path: "pricing",
      element: <Pricing />,
    },
    {
      path: "contact",
      element: <ContactUs />
    },
    {
      path: "reviews/:serviceId",
      element: <ServiceReviews />
    },
    {
      path: "login",
      element: <LoginUser />,
    },
    {
      path: "login-admin",
      element: <LoginAdmin />,
    },
  ],
};

export default mainRoutes;