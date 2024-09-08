import { Outlet, Link } from 'react-router-dom';

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
              <li><Link to="entries">My Entries</Link></li>
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
