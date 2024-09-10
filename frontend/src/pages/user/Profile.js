// A page component to show user details.
import { useSelector, shallowEqual } from "react-redux"
import { useGetUserQuery } from "../../store/APISlice";
import UserDetailsComponent from "../../components/UserDetailsComponent";

const Profile = () => {

  // Get user state from the store.
  const { user: loggedInUser } = useSelector((state) => state.user, shallowEqual);

  // Use query hook to get details of a perticular user.
  const { data, isLoading, isError, error } = useGetUserQuery(loggedInUser?.id);

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>
  
  // Show error message on query error.
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  // Get users from the data returned by the query.
  const user = data?.user;

  return (
    <UserDetailsComponent user={user} />
  );
};

export default Profile;