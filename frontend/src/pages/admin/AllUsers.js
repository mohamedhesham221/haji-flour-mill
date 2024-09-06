import "./styles/AllUsers.css";

import { useGetAllUsersQuery } from "../../store/APISlice";

const AllUsers = () => {

  const { data, isLoading, isError, error } = useGetAllUsersQuery();
  
  if (isLoading) return <p className="query-loading">Loading...</p>
  
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

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