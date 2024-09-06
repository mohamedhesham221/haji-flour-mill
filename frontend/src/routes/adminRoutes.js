import AdminLayout from "../components/layouts/AdminLayout.js";

import NewEntry from "../pages/admin/NewEntry.js";
import AllEntries from "../pages/admin/AllEntries.js";
import UserEntries from "../pages/admin/UserEntries.js";
import NewUser from "../pages/admin/NewUser.js";
import AllUsers from "../pages/admin/AllUsers.js";
import UserDetails from "../pages/admin/UserDetails.js";

const adminRoutes = {
  path: "admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <NewEntry />
    },
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
    }
  ],
};

export default adminRoutes;