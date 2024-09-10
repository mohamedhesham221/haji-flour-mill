// Component to protect user pages from unauthorized access.
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const Protected = () => {
  // Get user state from the store.
  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  // If user is logged in show the children components.
  // All the user routes are children of the /user path and those will be rendered using the Outlet component.
  // If the user is not logged in navigate user to the login page.
  return loggedInUser
    ? <Outlet />
    : <Navigate to={"/login"} />
};

export default Protected;