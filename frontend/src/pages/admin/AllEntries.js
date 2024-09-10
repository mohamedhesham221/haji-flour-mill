// A page component to show All entries.
import { useGetAllEntriesQuery } from "../../store/APISlice";

import EntriesComponent from "../../components/EntriesComponent";

const AllEntries = () => {

  // Use query hook to get all the entries on rendering the component.
  const { data, isLoading, isError, error } = useGetAllEntriesQuery();

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>
  
  // Show error message on query error.
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  // Get the entries from the data returned by query.
  const { entries } = data;

  // Render EntriesComponent with entries props to show on UI.
  return (
    <EntriesComponent entries={entries} />
  );
};

export default AllEntries;