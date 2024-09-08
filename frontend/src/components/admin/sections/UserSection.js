import { Link } from "react-router-dom";

const UserSection = () => {
  return (
    <div className="section">
      <h3>Users</h3>
      <ul>
        <li><Link to="new-user">Create User</Link></li>
        <li><Link to="all-users">All Users</Link></li>
        <li><Link to="user-details">Single User Details</Link></li>
      </ul>
    </div>
  );
};

export default UserSection;