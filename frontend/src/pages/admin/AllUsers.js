// A page component to show all the users.
import "./styles/AllUsers.css";

import { useGetAllUsersQuery } from "../../store/APISlice";

const AllUsers = () => {

  // Use query hook to get all the users on rendering the component.
  const { data, isLoading, isError, error } = useGetAllUsersQuery();
  
  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>
  
  // Show error message on query error.
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  // Get the users from the data returned by the query.
  const users = data?.users;

  return (
    <div className="all-users-container">
      <h2>All Users</h2>
      <table className="all-users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.isAdmin ? "ADMIN" : "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;