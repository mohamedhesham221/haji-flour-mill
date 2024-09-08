import "./UserDetailsComponent.css";

const UserDetailsComponent = ({ user }) => {
  
  return (
    <div className="profile-container">
      <h2>User Details</h2>
      <p className="property"><span className="title"><b>First Name:</b></span> <span className="value">{user.first_name}</span></p>
      <p className="property"><span className="title"><b>Last Name:</b> <span className="value"></span>{user.last_name}</span></p>
      <p className="property"><span className="title"><b>Username:</b> <span className="value"></span>{user.username}</span></p>
      <p className="property"><span className="title"><b>Email:</b> <span className="value"></span>{user.email}</span></p>
      <p className="property"><span className="title"><b>Mobile:</b> <span className="value"></span>{user.mobile}</span></p>
      <p className="property"><span className="title"><b>Payment Mode:</b> <span className="value"></span>{user.payment_mode}</span></p>
      <p className="property"><span className="title"><b>Status:</b> <span className="value"></span>{user.isAdmin ? "Admin" : "User"}</span></p>
      <p className="property"><span className="title"><b>Joined On:</b> <span className="value"></span>{new Date(user.createdAt).toLocaleDateString()}</span></p>
    </div>
  );
};

export default UserDetailsComponent;
