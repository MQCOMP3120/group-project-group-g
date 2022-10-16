import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testProductData } from "../../util/constants";
import { productsApi, brandsApi } from "../../util/api";

const initialState = {
  allProducts: testProductData,
  sortedProducts: testProductData,
  singleBrandProducts: [],
  brands: [],
  isLoading: false,
};

export const getProducts = createAsyncThunk("products/getProducts", () => {
  return fetch(productsApi)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

export const getBrands = createAsyncThunk("brands/getBrands", () => {
  return fetch(brandsApi)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.sortedProducts = state.allProducts;
    },
    sortByRelevance: (state, action) => {
      const keyWord = action.payload;
      if (keyWord === "") {
        state.sortedProducts = state.allProducts;
      } else {
        state.sortedProducts = state.allProducts.filter((product) =>
          product.title
            .toLocaleLowerCase()
            .includes(keyWord.toLocaleLowerCase())
        );
      }
    },

    sortByBrand: (state, action) => {
      const brandId = action.payload;
      state.singleBrandProducts = state.allProducts.filter(
        (product) => product.brandId === brandId
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
  // data fetching life cycle
  extraReducers: {
    [getProducts.pending]: (state) => {
      // while the fetching status is pending
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      // when data is successfully fecthed
      console.log(action);
      state.isLoading = false;
      state.allProducts = action.payload;
      state.sortedProducts = action.payload;
    },
    [getProducts.rejected]: (state) => {
      // when error occurs
      state.isLoading = false;
    },
    [getBrands.pending]: (state) => {
      // while the fetching status is pending
      state.isLoading = true;
    },
    [getBrands.fulfilled]: (state, action) => {
      // when data is successfully fecthed
      console.log(action);
      state.isLoading = false;
      state.brands = action.payload;
    },
    [getBrands.rejected]: (state) => {
      // when error occurs
      state.isLoading = false;
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
  resetProducts,
} = filterSlice.actions;
export default filterSlice.reducer;
