import { Link } from "react-router-dom";

const EntrySection = () => {
  return (
    <div className="section">
      <h3>Entries</h3>
      <ul>
        <li><Link to="new-entry">New Entry</Link></li>
        <li><Link to="all-entries">All Entries</Link></li>
        <li><Link to="user-entries">Single User Entries</Link></li>
      </ul>
    </div>
  );
};

export default EntrySection;