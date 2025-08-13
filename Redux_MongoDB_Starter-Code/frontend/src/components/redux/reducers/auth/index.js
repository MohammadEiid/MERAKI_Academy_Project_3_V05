import { createSlice } from "@reduxjs/toolkit";


const tokenFromStorage = localStorage.getItem("token");
const userIdFromStorage = localStorage.getItem("userId");

const initialState = {
  token: tokenFromStorage || null,
  userId: userIdFromStorage || null,
  isLoggedIn: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLogin, setUserId, setLogout } = authSlice.actions;
export default authSlice.reducer;

