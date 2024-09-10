// A page component to see a single user details.
import { useGetUserEntriesQuery } from "../../store/APISlice";

import UserSearchComponent from "../../components/admin/UserSearchComponent";
import EntriesComponent from "../../components/EntriesComponent";
import { useState, useRef } from "react";

const UserEntries = () => {

  // Use useRef to get the value of the input element when submit.
  const usernameRef = useRef();

  // Set local state submittedUsername with null value at first and use it to skip the query run for first render.
  const [username, setUsername] = useState(null);

  // Skip the first render as there is no username available for search on first render which is required to send in query search.
  const { data, isLoading, isError, error } = useGetUserEntriesQuery(username, {skip: !username});
  
  // If any error, print on console.
  if (isError) {
    console.error("Error: ", error);
  }

  /**
   * Searches the entries of user with username.
   * 
   * @param {Event} e event that triggered the function call
   */
  const handleSubmit = (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();

    // Set the local state value to input element value.
    // It will cause the re-render of the componenet, which will cause the query to fetch user entries as skip is no longer set to true.
    setUsername(usernameRef.current.value);
    usernameRef.current.value = "";

  }

  // Get user details from the data returned by the query.
  let entries = data?.entries;

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