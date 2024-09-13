// All routes related to UserLayout (user route).
import Protected from "../components/Protected.js";

import UserLayout from "../components/layouts/UserLayout.js";

import Profile from "../pages/user/Profile.js";
import Entries from "../pages/user/Entries.js";
import AddReview from "../pages/user/AddReview.js";

const userRoutes = {
  path: "user",
  element: <Protected />,
  children: [
    {
      path: "",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <Profile />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "entries",
          element: <Entries />,
        },
        {
          path: "reviews/add",
          element: <AddReview />
        }
      ],
    },
  ],
};

export default userRoutes;