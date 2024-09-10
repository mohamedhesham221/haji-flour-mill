// Component to protect admin pages from unauthorized access.
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const ProtectedAdmin = () => {
  // Get user state from the store.
  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  // If user is logged and user is admin only then show the children components.
  // All the admin routes are children of the /admin path and those will be rendered using the Outlet component.
  // If the user is not logged in or user is not admin navigate user to the login page.
  return loggedInUser && loggedInUser.isAdmin
    ? <Outlet />
    : <Navigate to={"/login-admin"} />
};

export default ProtectedAdmin;