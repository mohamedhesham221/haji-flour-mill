import { Navigate, Outlet } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const ProtectedAdmin = () => {
  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  return loggedInUser && loggedInUser.isAdmin
    ? <Outlet />
    : <Navigate to={"/login-admin"} />
};

export default ProtectedAdmin;