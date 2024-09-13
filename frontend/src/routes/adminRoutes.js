// All routes related to AdminLayout (admin route).
import AdminLayout from "../components/layouts/AdminLayout.js";

import ProtectedAdmin from "../components/ProtectedAdmin.js";

import NewEntry from "../pages/admin/NewEntry.js";
import AllEntries from "../pages/admin/AllEntries.js";
import UserEntries from "../pages/admin/UserEntries.js";
import NewUser from "../pages/admin/NewUser.js";
import AllUsers from "../pages/admin/AllUsers.js";
import UserDetails from "../pages/admin/UserDetails.js";
import AddService from "../pages/admin/AddService.js";
import AllServices from "../pages/admin/AllServices.js";
import UpdateService from "../pages/admin/UpdateService.js";
import AllReviews from "../pages/admin/AllReviews.js";
import UserReviews from "../pages/admin/UserReviews.js";
import ServiceReviewsAdmin from "../pages/admin/ServiceReviewsAdmin.js";

const adminRoutes = {
  path: "admin",
  element: <ProtectedAdmin />,
  children: [
    {
      path: "",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <NewEntry />
        },
        // Entry section routes.
        {
          path: "new-entry",
          element: <NewEntry />
        },
        {
          path: "all-entries",
          element: <AllEntries />
        },
        {
          path: "user-entries",
          element: <UserEntries />
        },
        // User section routes
        {
          path: "new-user",
          element: <NewUser />
        },
        {
          path: "all-users",
          element: <AllUsers />
        },
        {
          path: "user-details",
          element: <UserDetails />
        },
        // Service section routes
        {
          path: "add-service",
          element: <AddService />
        },
        {
          path: "all-services",
          element: <AllServices />
        },
        {
          path: "edit-service/:id",
          element: <UpdateService />
        },
        // Review section routes.
        {
          path: "all-reviews",
          element: <AllReviews />
        },
        {
          path: "user-reviews",
          element: <UserReviews />
        },
        {
          path: "service-reviews",
          element: <ServiceReviewsAdmin />
        }
      ]
    }
  ]
};

export default adminRoutes;