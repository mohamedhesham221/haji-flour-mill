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
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, incidunt iste quasi nisi neque quo pariatur fugit ad corporis, corrupti perferendis aliquam aperiam eaque minima tenetur repellendus non nam. Exercitationem at explicabo ea accusamus laboriosam eum, nam quos ut corrupti qui necessitatibus neque vel officia magni dolorem eveniet, nihil cum odit ipsum cupiditate non aperiam iste harum illo. Perspiciatis nihil, repudiandae provident praesentium molestiae totam fuga repellendus magnam dolorum inventore non quo veritatis quisquam doloremque architecto harum vitae vero officiis voluptas  animi facere, veritatis facilis nam distinctio asperiores! Corrupti illum maiores doloribus recusandae. Repellat necessitatibus, quibusdam sequi temporibus veritatis repellendus fugiat assumenda modi., 
          </p>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
