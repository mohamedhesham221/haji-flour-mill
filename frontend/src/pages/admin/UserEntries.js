import { useGetUserEntriesQuery } from "../../store/APISlice";

import UserSearchComponent from "../../components/admin/UserSearchComponent";
import EntriesComponent from "../../components/EntriesComponent";
import { useState, useRef } from "react";

const UserEntries = () => {

  const [username, setUsername] = useState(null);
  const usernameRef = useRef();

  const { data, isLoading, isError, error } = useGetUserEntriesQuery(username, {skip: !username});
  
  if (isError) {
    console.error("Error: ", error);
  }

  let entries = data?.entries;

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername(usernameRef.current.value);
    usernameRef.current.value = "";

  }

  return (
    <div >
      <UserSearchComponent
        title="Search User Entries"
        isLoading={isLoading}
        usernameRef={usernameRef}
        buttonText="Entries"
        handleSubmit={handleSubmit}
      />
      {entries &&
        <EntriesComponent entries={entries} username={username} />
      }
      {isError && 
        <p className="query-error">An error has occured!</p>
      }
    </div>
  );
};

export default UserEntries;