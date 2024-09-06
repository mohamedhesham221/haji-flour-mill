const TableComponent = () => {
  return (
    <table className="entries-table">
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
  )
}