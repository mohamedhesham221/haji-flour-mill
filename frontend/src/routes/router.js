import { createBrowserRouter } from "react-router-dom";

import mainRoutes from "./mainRoutes.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";

// Use createBrowserRouter to create routing in app.
export const router = createBrowserRouter([
  mainRoutes,
  userRoutes,
  adminRoutes,
  {
    path: "*",
    element: <h3>Error 404! Not Found.</h3>,
  },
]);
