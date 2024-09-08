import "./styles/Entries.css";

import { useSelector, shallowEqual } from "react-redux";
import { useGetUserEntriesQuery } from "../../store/APISlice";

import EntriesComponent from "../../components/EntriesComponent";

const Entries = () => {

  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  const { data, isLoading, isError, error } = useGetUserEntriesQuery(loggedInUser?.username);

  if (isLoading) return <p className="query-loading">Loading...</p>
  
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  const { entries } = data;

  return (
    <EntriesComponent entries={entries} username={loggedInUser?.username} />
  );
};

export default Entries;