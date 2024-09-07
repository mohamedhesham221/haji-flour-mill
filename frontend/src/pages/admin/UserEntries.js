import "./styles/UserEntries.css";

import { useGetUserEntriesQuery } from "../../store/APISlice";

import EntriesComponent from "../../components/EntriesComponent";
import { useState, useRef } from "react";

const UserEntries = () => {

  console.log("Rendering the UserEntries page.");

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
      <div className="entry-search-container">
        <h1>Search User Entries</h1>
        <form onSubmit={handleSubmit} className="entry-search-form">
          <input
            className="username-input"
            type="text"
            placeholder="Enter username"
            ref={usernameRef}
            required
          />
          <button type="submit" className="submit-button" disabled={isLoading}>{ isLoading ? "Getting Entries..." : "Get Entries" }</button>
        </form>
      </div>
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