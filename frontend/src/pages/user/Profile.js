import { useSelector, shallowEqual } from "react-redux"
import { useGetUserQuery } from "../../store/APISlice";
import UserDetailsComponent from "../../components/UserDetailsComponent";

const Profile = () => {

  const { user: loggedInUser } = useSelector((state) => state.user, shallowEqual);

  const { data, isLoading, isError, error } = useGetUserQuery(loggedInUser?.id);

  if (isLoading) return <p className="query-loading">Loading...</p>
  
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  const user = data?.user;

  return (
    <UserDetailsComponent user={user} />
  );
};

export default Profile;