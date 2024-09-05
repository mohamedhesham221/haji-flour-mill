import { Navigate, Outlet } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const Protected = () => {
  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  return loggedInUser
    ? <Outlet />
    : <Navigate to={"/login"} />
};

export default Protected;