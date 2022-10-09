import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './features/navbar/searchSlice';
import authReducer from './features/userAuth/authSlice';
export const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer, 
    },
});
