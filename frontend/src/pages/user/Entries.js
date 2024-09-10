// A page component to show Entries of the logged in user.
import { useSelector, shallowEqual } from "react-redux";
import { useGetUserEntriesQuery } from "../../store/APISlice";

import EntriesComponent from "../../components/EntriesComponent";

const Entries = () => {
  // Get user state from the store.
  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  // Use query hook to get entries of a perticular user.
  const { data, isLoading, isError, error } = useGetUserEntriesQuery(loggedInUser?.username);

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>
  
  // Show error message on query error.
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  // Get entries from the data returned by the query.
  const entries = data?.entries;

  return (
    <EntriesComponent entries={entries} username={loggedInUser?.username} />
  );
};

export default Entries;