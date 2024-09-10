// A common component to display user details in user pages as well as admin pages.
import "./UserDetailsComponent.css";

// It takes user as props to display details on the UI.
const UserDetailsComponent = ({ user }) => {
  
  return (
    <div className="profile-container">
      <h2>User Details</h2>
      
      <p className="property"><span className="title"><b>Username:</b></span> <span className="value">{user.username}</span></p>

      <p className="property"><span className="title"><b>First Name:</b></span> <span className="value">{user.first_name}</span></p>

      <p className="property"><span className="title"><b>Last Name:</b></span> <span className="value">{user.last_name}</span></p>

      <p className="property"><span className="title"><b>Email:</b></span> <span className="value">{user.email}</span></p>

      <p className="property"><span className="title"><b>Mobile:</b></span> <span className="value">{user.mobile}</span></p>

      <p className="property"><span className="title"><b>Payment Mode:</b></span> <span className="value">{user.payment_mode}</span></p>

      <p className="property"><span className="title"><b>Status:</b></span> <span className="value">{user.isAdmin ? "Admin" : "User"}</span></p>

      <p className="property"><span className="title"><b>Joined On:</b></span> <span className="value">{new Date(user.createdAt).toLocaleDateString()}</span></p>

    </div>
  );
};

export default UserDetailsComponent;
