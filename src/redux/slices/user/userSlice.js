// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  accessToken: null,
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
  },
});

export const { setUserInfo, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
