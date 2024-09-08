import React, { useRef, useState } from 'react';
import { useGetUserQuery } from '../../store/APISlice';
import UserSearchComponent from '../../components/admin/UserSearchComponent';
import UserDetailsComponent from '../../components/UserDetailsComponent';

const UserDetails = () => {

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
