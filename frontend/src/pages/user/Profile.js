import { useSelector, shallowEqual } from "react-redux"
import { useGetUserQuery } from "../../store/APISlice";

const Profile = () => {

  const { user: loggedInUser } = useSelector((state) => state.user, shallowEqual);

  const { data, isLoading, isError, error } = useGetUserQuery(loggedInUser?.id);

  if (isLoading) return <p className="query-loading">Loading...</p>
  
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  const { first_name, last_name, username, email, mobile, payment_mode, createdAt } = data.user;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {first_name}</p>
      <p><strong>Last Name:</strong> {last_name}</p>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Mobile:</strong> {mobile}</p>
      <p><strong>Payment Mode:</strong> {payment_mode}</p>
      <p><strong>Joined On:</strong> {new Date(createdAt).toLocaleDateString()}</p>
    </div>

  );
};

export default Profile;