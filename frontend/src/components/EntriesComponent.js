import "./EntriesComponent.css";

const EntriesComponent = ({entries, username}) => {

  return (
    <div className="entries-page">
      {username
        ? <h2>Entries for {username}</h2>
        : <h2>All Entries</h2>
         
      }
      {entries?.length > 0
        ? <table className="entries-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Service</th>
                <th>Weight</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries?.map((entry) => (
                <tr key={entry._id} >
                  <td>{entry.user}</td>
                  <td>{entry.service?.name}</td>
                  <td>{entry.weight}</td>
                  <td>{entry.amount}</td>
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

export default EntriesComponent;