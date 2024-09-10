// A common component to perform login functionality for user and admin.
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import { useLoginAdminMutation, useLoginUserMutation } from "../store/APISlice";
import { setUser } from "../store/userSlice";


const Login = ({ navigateTo = "", admin = false }) => {

  // Set local states to get form input values using controlled form.
  const [ username, setUsername ] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();  

  // Call LoginUser Mutation and LoginAdmin Mutation hooks and get the functions which will trigger the mutation.
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [loginAdmin, { isLoading: adminLoading, error: adminError}] = useLoginAdminMutation();

  /**
   * 
   * @param {Event} e event that triggered the function call.
   */
  const submitHandler = async (e) => {
    // Prevent the default behaviour of the event fire.
    e.preventDefault();

    // If trying to login the admin, trigger the LoginAdmin Mutation.
    // Else if trying to login the user, trigger the LoginUser Mutation.
    // This is because the server authenticates the user and admin differently on different routes.
    // Triggering different mutations will allow server to prevent unauthorized access of admin pages if a user tries to login as admin.
    try {
      let user, token;

      admin 
        ? { user, token } = await loginAdmin({ username, password }).unwrap()
        : { user, token } = await loginUser({ username, password }).unwrap();
      
      // After successful login, save the jwt-token in local storage to send in subsequent queries and mutations.
      // Also set the user state in store to the returned user. This will be used to Protect the User pages and Admin pages from unauthorized access.
      window.localStorage.setItem("hajiFlourMillJWTToken", token);
      dispatch(setUser(user));

      // After successfully logging in, navigate to respective page according to admin or user login.
      // Set replace: true to replace the url in history stack top instead of adding on top.
      navigate(navigateTo, {replace: true});
      
    } catch (error) {
      // If any error in logging in, print it.
      console.error(error);
    }
    

  }

  return (
    <div className="login-container">
      <h3>{ admin ? "Login Admin" : "Login User" }</h3>
      <div className="login-box">
        <form className="login-form" onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" type="submit" disabled={isLoading || adminLoading}>
            {isLoading || adminLoading ? "Logging in..." : `Login ${admin ? "Admin" : "User"}`}
          </button>
        </form>
      </div>

      {/* Show error message if there is any error in logging in. */}
      {(error || adminError) && 
        <div className="query-error login-error">
          {
            error?.status === 400
              ? <p>Incorrect username or password!</p>
              : error && <p>Can not proceed, Server error!</p>
          }
          {
            adminError?.status === 400
              ? <p>Incorrect username or password!</p>
              : adminError?.status === 403
                ? <p>Access forbidden!</p>
                : adminError && <p> Can not proceed, Server error!</p>
          }
        </div>
      }
    </div>
  );
};

export default Login;