import { Outlet, Link } from 'react-router-dom';

import Header from '../Header.js';
import Footer from '../Footer.js';

const AdminLayout = () => {

  return (
    <div className="top-container admin-layout-container">
      <Header logoutButton/>
      <div className="main-div top-div admin-main">
        <aside className="sidebar">
          <div className="sidebar-buttons">
            <Link to="new-entry" className="btn">New Entry</Link>
            <Link to="new-user" className="btn">New User</Link>
          </div>
          <nav>
            <div className="section">
              <h3>Entries</h3>
              <ul>
                <li><Link to="new-entry">New Entry</Link></li>
                <li><Link to="all-entries">Get All Entries</Link></li>
                <li><Link to="user-entries">Get Entries of User</Link></li>
              </ul>
            </div>
            <div className="section">
              <h3>Users</h3>
              <ul>
                <li><Link to="new-user">Create User</Link></li>
                <li><Link to="all-users">Get All Users</Link></li>
                <li><Link to="user-details">Get a Single User</Link></li>
              </ul>
            </div>
            <div className="section">
              <h3>Services</h3>
              <ul>
                <li><Link to="add-service">Add Service</Link></li>
                <li><Link to="all-services">Get All Services</Link></li>
              </ul>
            </div>
          </nav>
        </aside>
        <main className="content admin-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
