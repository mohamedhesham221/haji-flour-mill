import AdminLayout from "../components/layouts/AdminLayout.js";

import NewEntry from "../pages/admin/NewEntry.js";
import AllEntries from "../pages/admin/AllEntries.js";
import UserEntries from "../pages/admin/UserEntries.js";

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
    }
  ],
};

export default adminRoutes;