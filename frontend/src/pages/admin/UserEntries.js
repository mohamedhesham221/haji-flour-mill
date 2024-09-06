import { useGetUserEntriesQuery } from "../../store/APISlice";

import EntriesComponent from "../../components/EntriesComponent";
import { useState, useRef } from "react";

const UserEntries = () => {

  console.log("Rendering the UserEntries page.");

  const [username, setUsername] = useState("");
  const [skip, setSkip] = useState(true);
  const usernameRef = useRef();

  const { data, isFetching: isSubmitting, isError, error } = useGetUserEntriesQuery(username, {skip});
  
  if (isError) {
    console.error("Error: ", error);
  }

  let entries = data?.entries;

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername(usernameRef.current.value);
    setSkip(false);

  }

  return (
    <div>
      <form className="new-entry-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            ref={usernameRef}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Getting entries..." : "Get Entries"}
        </button>
      </form>
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