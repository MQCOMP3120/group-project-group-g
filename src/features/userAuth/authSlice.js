import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../util/api";
import { toast } from "react-toastify";
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
  validated: false,
};

export const regUser = createAsyncThunk(
  "auth/register",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth } = getState();
      let { user } = auth;
      const { data, status } = await axios.post(registerApi, user);
      const notify = () =>
        toast.success("Account registered!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      if (status === 200) {
        dispatch(setValidated());
        dispatch(setUser(data));
        dispatch(signIn());
        notify();
      }
    } catch (err) {
      console.log(err);
      const notify = () =>
        toast.error("Sorry, that username already exist", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      notify();
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
      const notify = () =>
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      if (status === 200) {
        dispatch(setUser(data));
        dispatch(signIn());
        notify();
      }
    } catch (err) {
      const notify = () =>
        toast.error("Incorrect username or password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      notify();
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
      state.user = {
        userId: "",
        username: "",
        email: "",
        password: "",
        address: "",
        phone: "",
      };
      state.validated = false;
      const notify = () =>
        toast.success("You have been logged out Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      notify();
    },
    setValidated: (state) => {
      state.validated = true;
    },
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
  setValidated,
} = authSlice.actions;
export default authSlice.reducer;
