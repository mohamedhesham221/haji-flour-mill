import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ linkItems = [], logoutButton = false }) => {
  
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h1><Link to="/">Haji Flour Mill</Link></h1>
        </div>
        
        {
          linkItems.length > 0 && 
          <ul>
              {
                linkItems.map((link, index) =>
                  <li key={index}>
                    <Link to={`${link.pathname}`}>{`${link.title}`}</Link>
                  </li>
                )
              }
          </ul>
        }
      </nav>
      <div className="auth-links">
        {!logoutButton 
          ? <>
              <Link to="/login">Login User</Link>
              <Link to="/admin/login">Login Admin</Link>
            </>
          : <a href="#">Logout</a>
        }
      </div>
    </header>
  );
};

export default Header;