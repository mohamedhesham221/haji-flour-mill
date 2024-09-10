// A page component to see a single user details.
import React, { useRef, useState } from 'react';
import { useGetUserQuery } from '../../store/APISlice';
import UserSearchComponent from '../../components/admin/UserSearchComponent';
import UserDetailsComponent from '../../components/UserDetailsComponent';

const UserDetails = () => {

  // Use useRef to get the value of the input element when submit.
  const usernameRef = useRef();

  // Set local state submittedUsername with null value at first and use it to skip the query run for first render.
  const [username, setUsername] = useState(null);

  // Skip the first render as there is no username available for search on first render which is required to send in query search.
  const { data, isError, error, isLoading } = useGetUserQuery(username, {
    skip: !username,
  });

  // If any error, print on console.
  isError && console.error(error);

  /**
   * Searches the user with username.
   * 
   * @param {Event} e event that triggered the function call
   */
  const handleSubmit = (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();
    // Set the local state value to input element value.
    // It will cause the re-render of the componenet, which will cause the query to fetch user data as skip is no longer set to true.
    setUsername(usernameRef.current.value);
    usernameRef.current.value = ""
  };

  // Get user details from the data returned by the query.
  const user = data?.user;

  return (
    <div className="user-details-container">
      <UserSearchComponent
        title={"Search User Details"}
        usernameRef={usernameRef}
        isLoading={isLoading}
        buttonText={"Details"}
        handleSubmit={handleSubmit} />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching user details</p>}

      {!isLoading && !error && user && 
        <UserDetailsComponent user={user} />
      }
    </div>
  );
};

export default UserDetails;
