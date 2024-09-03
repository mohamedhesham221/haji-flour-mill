import { Outlet, Link } from 'react-router-dom';
import './UserLayout.css';

import Header from '../Header.js';
import Footer from '../Footer.js';

const UserLayout = () => {
  return (
    <div className="top-container user-layout-container">
      <Header logoutButton/>
      <div className="main-div top-div user-main">
        <aside className="sidebar">
          <nav>
            <ul>
              <li><Link to="profile">Profile</Link></li>
              <li><Link to="entries">Get Entries</Link></li>
              <li><Link to="entries-by-date">Get Entries by Date</Link></li>
            </ul>
          </nav>
        </aside>
        <main className="content user-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
