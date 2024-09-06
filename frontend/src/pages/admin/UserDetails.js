import React, { useRef, useState } from 'react';
import { useGetUserQuery } from '../../store/APISlice';
import './styles/UserDetails.css';

const UserDetails = () => {
  console.log("Rendering.")

  const usernameRef = useRef();
  const [submittedUsername, setSubmittedUsername] = useState(null);

  const { data, isError, error, isLoading } = useGetUserQuery(submittedUsername, {
    skip: !submittedUsername,
  });

  isError && console.error(error);

  const user = data?.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUsername(usernameRef.current.value);
    usernameRef.current.value = ""
  };

  return (
    <div className="user-details-container">
      <div className="user-search-container">
        <h1>Search User Details</h1>
        <form onSubmit={handleSubmit} className="user-search-form">
          <input
            type="text"
            placeholder="Enter username"
            ref={usernameRef}
            className="username-input"
            required
          />
          <button type="submit" className="submit-button" disabled={isLoading}>{ isLoading ? "Getting Details..." : "Get Details" }</button>
        </form>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching user details</p>}

      {!isLoading && !error && user && (
        <div className="user-details">
          <h2>User Details</h2>
          <p><b>First Name:</b> {user.first_name}</p>
          <p><b>Last Name:</b> {user.last_name}</p>
          <p><b>Username:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Mobile:</b> {user.mobile}</p>
          <p><b>Payment Mode:</b> {user.payment_mode}</p>
          <p><b>Status:</b> {user.isAdmin ? "Admin" : "User"}</p>
          <p><b>Joined:</b> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
