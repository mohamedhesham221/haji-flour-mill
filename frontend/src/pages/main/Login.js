import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./styles/Login.css";

import { useLoginUserMutation } from "../../store/APISlice";
import { setUser } from "../../store/userSlice";


const Login = () => {

  const [ username, setUsername ] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const { user, token } = await loginUser({ username, password }).unwrap();
      window.localStorage.setItem("hajiFlourMillUser", JSON.stringify(user));
      window.localStorage.setItem("hajiFlourMillJWTToken", token);
      dispatch(setUser(user));
      navigate("/user");
      
    } catch (error) {
      console.error(error);
    }
    

  }

  return (
    <div className="login-container">
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
          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {error && 
        <div className="query-error login-error">
          {
            error.status === 400
              ? <p>Incorrect username or password!</p>
              : <p>Can not proceed, Server error!</p>
          }
        </div>
      }
    </div>
  );
};

export default Login;