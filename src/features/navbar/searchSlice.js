import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    searchModalOpen: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        openSearch: (state) => {
            state.searchModalOpen = true;
        },

        closeSearch: (state) => {
            state.searchModalOpen = false;
        },
    },
});

export const { openSearch, closeSearch } = searchSlice.actions;
export default searchSlice.reducer;