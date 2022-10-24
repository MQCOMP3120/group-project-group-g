import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/navbar/searchSlice";
import authReducer from "./features/userAuth/authSlice";
import filterSlice from "./features/products/filterSlice";
import cartSlice from "./features/cart/cartSlice";
import wishListSlice from "./features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    filter: filterSlice,
    cart: cartSlice,
    wish: wishListSlice, 
  },
});
