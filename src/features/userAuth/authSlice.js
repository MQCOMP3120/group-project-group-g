import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../util/api";
import axios from "axios";

const initialState = {
  isSignIn: false,
  authErr: false,
  user: {
    userId: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  },
};

export const regUser = createAsyncThunk(
  "/register",
  async (arg, { getState }) => {
    try {
      const { auth, dispatch } = getState();
      let { user } = auth;
      const { data } = await axios.post(registerApi, user);

      dispatch(setUser(data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const authUser = createAsyncThunk(
  "auth/login",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth } = getState();
      let { user } = auth;
      console.log(user);
      const { data, status } = await axios.post(loginApi, user);

      dispatch(setUser(data));
    } catch (err) {
      const { auth } = getState();
      let { authErr } = auth;
      authErr = true;
      console.log(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    usernameOnChange: (state, action) => {
      let val = action.payload;
      state.user.username = val;
    },
    passwordOnChange: (state, action) => {
      let val = action.payload;
      state.user.password = val;
    },
    emailOnChange: (state, action) => {
      let val = action.payload;
      state.user.email = val;
    },
    setUser: (state, action) => {
      const newUser = action.payload;
      state.user = {
        ...state.user,
        ...newUser,
      };
      console.log(state.user);
    },
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
    },
  },
});

export const {
  signIn,
  signOut,
  usernameOnChange,
  emailOnChange,
  passwordOnChange,
  setUser,
} = authSlice.actions;
export default authSlice.reducer;
