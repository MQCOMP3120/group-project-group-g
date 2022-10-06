import { configureStore } from "@reduxjs/toolkit";
import searchReducer from './features/navbar/searchSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});
