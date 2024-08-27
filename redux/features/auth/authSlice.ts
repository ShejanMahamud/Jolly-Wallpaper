import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      AsyncStorage.setItem("access-token", action.payload?.token);
    },
    clearUser: (state) => {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem("access-token");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
