import AdminLayout from "../components/layouts/AdminLayout.js";

import NewEntry from "../pages/admin/NewEntry.js";

const adminRoutes = {
  path: "admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <NewEntry />,
    },
  ],
};

export default adminRoutes;