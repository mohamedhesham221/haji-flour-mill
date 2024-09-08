import "./styles/AllEntries.css";

import { useGetAllEntriesQuery } from "../../store/APISlice";

import EntriesComponent from "../../components/EntriesComponent";

const AllEntries = () => {

  const { data, isLoading, isError, error } = useGetAllEntriesQuery();

  if (isLoading) return <p className="query-loading">Loading...</p>
  
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  const { entries } = data;

  return (
    <EntriesComponent entries={entries} />
  );
};

export default AllEntries;