import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/navbar/searchSlice";
import authReducer from "./features/userAuth/authSlice";
import filterSlice from "./features/products/filterSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    filter: filterSlice,
  },
});
