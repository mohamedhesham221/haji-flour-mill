import { Link } from "react-router-dom";
import "./Header.css";

import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const Header = ({ linkItems = [], logoutButton = false }) => {

  const dispatch = useDispatch();
  
  const handleClick = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("hajiFlourMillJWTToken");
    dispatch(setUser(null));

  }

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
              <Link to="/login-admin">Login Admin</Link>
            </>
          : <a href="#" onClick={handleClick}>Logout</a>
        }
      </div>
    </header>
  );
};

export default Header;