import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import Header from '../Header.js';
import Footer from '../Footer.js';
import { useEffect } from 'react';

// Set linkItems to show on header of MainLayout.
const linkItems = [
  {
    title: "Home",
    pathname: "/"
  },
  {
    title: "Services",
    pathname: "/services"
  },
  {
    title: "Pricing",
    pathname: "/pricing"
  },
  {
    title: "Contact",
    pathname: "/contact"
  }
]

// Shows the MainLayout screen.
// If the user is loggedIn, do not show the main layout.
const MainLayout = () => {

  const navigate = useNavigate();

  // Get user state from store.
  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  // If the user is loggedIn, send it to appropriate path.
  useEffect(() => {
    if (loggedInUser) navigate(loggedInUser.isAdmin ? "/admin" : "/user", {replace: true});
  }, [loggedInUser]);

  return (
    <div className="top-container main-layout-container">
      <Header linkItems={ linkItems } />
      <div className="main-div main-main">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
