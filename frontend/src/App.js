import "./App.css"

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.js";
import {  useDispatch } from "react-redux";

import { useInitUserMutation } from "./store/APISlice.js";
import { setUser } from "./store/userSlice.js";
import { useEffect } from "react";

// Initializes the user state in store on every reload of the app.
// Verifies the token from server in every reload to make sure it's valid token.
function App() {

  const dispatch = useDispatch();
  // Use InitUser Mutation to verify the user.
  const [initUser] = useInitUserMutation();

  // Triggers the initUser function.
  // Sets the user state to returned user if token has been verified successfully.
  // If the token is invalid and error has occured, remove the token from local storage and set the user state to null.
  useEffect(() => {
    // As useEffect does not support asynchronous callback, create an asynchronous function inside and call it.

    async function initUserState() {
      try {
        
        const { user } = await initUser().unwrap();

        dispatch(setUser(user));

      } catch (error) {

        console.error(error);

        window.localStorage.removeItem("hajiFlourMillJWTToken");

        dispatch(setUser(null));
      }
    }
    
    initUserState();
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
