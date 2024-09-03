import { Outlet } from 'react-router-dom';

import Header from '../Header.js';
import Footer from '../Footer.js';

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

const MainLayout = () => {
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
