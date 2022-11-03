import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchModalOpen: false,
  hideNavBar: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.searchModalOpen = true;
    },

    closeSearch: (state) => {
      state.searchModalOpen = false;
    },
    setHideNavBarTrue: (state) => {
      state.hideNavBar = true;
    },
    setHideNavBarFalse: (state) => {
      state.hideNavBar = false;
    },
  },
});

export const {
  openSearch,
  closeSearch,
  setHideNavBarFalse,
  setHideNavBarTrue,
} = searchSlice.actions;
export default searchSlice.reducer;
