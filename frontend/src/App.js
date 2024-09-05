import "./App.css"

import { RouterProvider } from "react-router-dom";
import { router } from "./router.js";
import {  useDispatch } from "react-redux";

import { useInitUserMutation } from "./store/APISlice.js";
import { setUser } from "./store/userSlice.js";
import { useEffect } from "react";


function App() {

  const dispatch = useDispatch();
  const [initUser] = useInitUserMutation();

  useEffect(() => {
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
