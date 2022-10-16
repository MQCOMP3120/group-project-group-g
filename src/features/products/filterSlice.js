import { createSlice } from "@reduxjs/toolkit";
import { testProductData } from "../../util/constants";

const initialState = {
  allProducts: testProductData,
  sortedProducts: testProductData,
  singleBrandProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    sortByRelevance: (state, action) => {
      const keyWord = action.payload;
      if (keyWord === "") {
        state.sortedProducts = state.allProducts;
      } else {
        state.sortedProducts = state.allProducts.filter((product) =>
          product.name.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
        );
      }
    },

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
  sortByRelevance,
} = filterSlice.actions;
export default filterSlice.reducer;
