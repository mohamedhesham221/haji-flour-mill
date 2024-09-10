// Header component to render header content in layout.
// It's configurable based on the props provided.
import { Link } from "react-router-dom";
import "./Header.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";

const Header = ({ linkItems = [], logoutButton = false }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  /**
   * Logs out the user.
   * 
   * @param {Event} e event that triggered the function call.
   */
  const handleLogout = (e) => {
    // Prevent the default action caused by the event.
    e.preventDefault();

    // Remove the token from the local storage and also set the user state to `null` in store.
    window.localStorage.removeItem("hajiFlourMillJWTToken");
    dispatch(setUser(null));
    navigate("/");

  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h1><Link to="/">Haji Flour Mill</Link></h1>
        </div>
        {/* If there are linkItems provided by the parent component, render here.(Usually provided by MainLayout.) */}
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
        {/* When logoutButton is set to true, then display link to logout user.(Usually UserLayout and AdminLayout sets it to true.) */}
        {!logoutButton 
          ? <>
              <Link to="/login">Login User</Link>
              <Link to="/login-admin">Login Admin</Link>
            </>
          : <a href="#" onClick={handleLogout}>Logout</a>
        }
      </div>
    </header>
  );
};

export default Header;