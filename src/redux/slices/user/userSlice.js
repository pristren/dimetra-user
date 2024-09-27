// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  accessToken: null,
  profileImageLoaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfileImageLoaded: (state, action) => {
      state.profileImageLoaded = action.payload;
    },
  },
});

export const { setUserInfo, setAccessToken, setProfileImageLoaded } =
  userSlice.actions;

export default userSlice.reducer;
