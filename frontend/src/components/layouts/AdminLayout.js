import { Outlet, Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

import Header from '../Header.js';
import Footer from '../Footer.js';

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname; // Get the current path

  return (
    <div className="top-container admin-layout-container">
      <Header logoutButton/>
      <div className="main-div top-div admin-main">
        <aside className="sidebar">
          <div className="sidebar-buttons">
            <Link to={`${currentPath}/new-entry`} className="btn">New Entry</Link>
            <Link to={`${currentPath}/new-user`} className="btn">New User</Link>
          </div>
          <nav>
            <div className="section">
              <h3>Entries</h3>
              <ul>
                <li><Link to={`${currentPath}/new-entry`}>New Entry</Link></li>
                <li><Link to={`${currentPath}/get-all-entries`}>Get All Entries</Link></li>
                <li><Link to={`${currentPath}/get-entries-of-user`}>Get Entries of User</Link></li>
                <li><Link to={`${currentPath}/get-entries-by-date`}>Get Entries by Date</Link></li>
              </ul>
            </div>
            <div className="section">
              <h3>Users</h3>
              <ul>
                <li><Link to={`${currentPath}/new-user`}>Create User</Link></li>
                <li><Link to={`${currentPath}/get-all-users`}>Get All Users</Link></li>
                <li><Link to={`${currentPath}/get-single-user`}>Get a Single User</Link></li>
              </ul>
            </div>
            <div className="section">
              <h3>Services</h3>
              <ul>
                <li><Link to={`${currentPath}/get-all-services`}>Get All Services</Link></li>
                <li><Link to={`${currentPath}/add-service`}>Add Service</Link></li>
                <li><Link to={`${currentPath}/edit-service`}>Edit Service</Link></li>
                <li><Link to={`${currentPath}/delete-service`}>Delete Service</Link></li>
              </ul>
            </div>
          </nav>
        </aside>
        <main className="content admin-content">
          <Outlet /> {/* This will render the pages/components matching the current route */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
