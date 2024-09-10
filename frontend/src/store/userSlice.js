// Local slice to store details of loggedIn user.
import { createSlice } from "@reduxjs/toolkit";

// Set initial state to null.
const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;