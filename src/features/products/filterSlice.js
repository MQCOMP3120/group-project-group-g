import { createSlice } from "@reduxjs/toolkit";
import { testProductData } from "../../util/constants";

const initialState = {
  sortedProducts: testProductData,
  singleBrandProducts: [],
  keyWord: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    sortByRelevance: (state, action) => {},

    sortByBrand: (state, action) => {
      const brand = action.payload;
      state.singleBrandProducts = state.sortedProducts.filter(
        (product) => product.brand === brand
      );
    },
    sortByPriceLowHigh: (state) => {
      state.sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
    },
    sortByPriceHighLow: (state) => {
      state.sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
    },
    sortByRatingLowHigh: (state) => {
      state.sortedProducts.sort((a, b) => {
        return a.rating - b.rating;
      });
    },
    sortByRatingHighLow: (state) => {
      state.sortedProducts.sort((a, b) => {
        return b.rating - a.rating;
      });
    },
  },
});

export const {
  sortByPriceLowHigh,
  sortByPriceHighLow,
  sortByRatingHighLow,
  sortByRatingLowHigh,
  sortByBrand,
} = filterSlice.actions;
export default filterSlice.reducer;
