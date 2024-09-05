import { useSelector, shallowEqual } from "react-redux";
import { useGetUserEntriesQuery } from "../../store/APISlice";

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
    <div className="entries-page">
      <h2>Entries for {loggedInUser?.username}</h2>
      {entries.length > 0
        ? <table className="entries-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Weight</th>
                <th>Amount</th>
                <th>Service</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries?.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry._id}</td>
                  <td>{entry.weight}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.service?.name}</td>
                  <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        : <b><p>No entries found!</p></b>
      }
    </div>
  );
};

export default Entries;