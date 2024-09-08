import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import Header from '../Header.js';
import Footer from '../Footer.js';
import { useEffect } from 'react';

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
  }
]

const MainLayout = () => {

  const navigate = useNavigate();

  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

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
