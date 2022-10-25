import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../util/api";
import axios from "axios";

const initialState = {
  isSignIn: false,
  authErr: false,
  isLoading: false,
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
  "auth/register",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth, dispatch } = getState();
      let { user } = auth;
      const { data } = await axios.post(registerApi, user);

      dispatch(setUser(data));
    } catch (err) {
      console.log(err);
      window.alert("Invalid Register Details");
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
      if (status === 200) {
        dispatch(signIn());
      }
    } catch (err) {
      console.log(err);
      window.alert("Invalid Login Details");
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
      window.localStorage.setItem("user", JSON.stringify(newUser));
    },
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      window.localStorage.clear();
      state.isSignIn = false;
    },
    // setAuthErrTrue: (state) => {
    //   state.authErr = true;
    // },
    // setAuthErrfalse: (state) => {
    //   state.authErr = false;
    // },
  },
  extraReducers: {
    [authUser.pending]: (state) => {
      // while the fetching status is pending
      state.isLoading = true;
    },
    [authUser.fulfilled]: (state, action) => {
      // when data is successfully fecthed
      state.isLoading = false;
    },
    [authUser.rejected]: (state) => {
      // when error occurs
      state.isLoading = false;
    },
    [regUser.pending]: (state) => {
      // while the fetching status is pending
      state.isLoading = true;
    },
    [regUser.fulfilled]: (state, action) => {
      // when data is successfully fecthed
      state.isLoading = false;
      // state.authErr = false;
      // state.isSignIn = true;
    },
    [regUser.rejected]: (state) => {
      // when error occurs
      // state.isLoading = false;
      // window.alert("Invalid login credential");
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
