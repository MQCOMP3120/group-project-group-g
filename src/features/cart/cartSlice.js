import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  cartApi,
  cartUserApi,
  cartHistoryApi,
  userCartHistoryApi,
} from "../../util/api";
import axios from "axios";

const initialState = {
  cartsHistory: [],
  userCart: [],
  cartProducts: [],
  cartSummary: {},
  currentCartHistory: {},
  isLoading: false,
  emptyCart: false,
  subtotal: 0,
};

// post a cart to cart history
export const postCartHistory = createAsyncThunk(
  "cart/postCartHistory",
  async (arg, { getState }) => {
    try {
      const { auth, cart } = getState();
      let { user } = auth;
      const { cartSummary } = cart;
      const resp = await axios.post(
        cartHistoryApi,
        { subtotal: cartSummary.subtotal, products: cartSummary.cartProducts },
        {
          headers: {
            Authorization: user.jwt,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
);

// get cart history
export const getCartHistory = createAsyncThunk(
  "cart/getCartHistory",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth } = getState();
      let { user } = auth;
      const { data } = await axios.get(userCartHistoryApi, {
        headers: {
          Authorization: user.jwt,
        },
      });
      if (data.length > 0) {
        dispatch(setCartHistory(data.reverse()));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// get current user's cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth } = getState();
      let { user } = auth;
      const { data } = await axios.get(cartUserApi, {
        headers: {
          Authorization: user.jwt,
        },
      });

      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  }
);

// create a new cart
export const postCart = createAsyncThunk(
  "cart/postCart",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth, cart } = getState();
      let { user } = auth;
      const { cartProducts } = cart;
      const { data } = await axios.post(
        cartApi,
        { products: cartProducts },
        {
          headers: {
            Authorization: user.jwt,
          },
        }
      );
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const delCartProduct = createAsyncThunk(
  "cart/delCartProduct",
  async (id, { getState, dispatch }) => {
    try {
      const { auth, cart } = getState();
      let { user } = auth;
      const { userCart, cartProducts } = cart;
      if (userCart[0]) {
        const resp = await axios.put(
          `${cartApi}${userCart[0].id}`,
          {
            products: cartProducts.filter(
              (product) => product.productId !== id
            ),
          },
          {
            headers: {
              Authorization: user.jwt,
            },
          }
        );
        dispatch(removeProduct(id));
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// delete a cart / clear all items in current cart
export const delCart = createAsyncThunk(
  "cart/delCart",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth, cart } = getState();
      let { user } = auth;
      const { userCart } = cart;
      if (userCart[0]) {
        await axios.delete(`${cartApi}${userCart[0].id}`, {
          headers: {
            Authorization: user.jwt,
          },
        });

        dispatch(resetCart());
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// add product to cart
export const putCart = createAsyncThunk(
  "cart/putCart",
  async (product, { getState }) => {
    try {
      //   dispatch(addProduct(product));
      const { auth, cart } = getState();
      let { user } = auth;
      const { userCart, cartProducts } = cart;
      if (userCart[0]) {
        const resp = await axios.put(
          `${cartApi}${userCart[0].id}`,
          { products: cartProducts },
          {
            headers: {
              Authorization: user.jwt,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// pay cart
export const payCart = createAsyncThunk(
  "cart/payCart",
  async (product, { getState }) => {
    try {
      //   dispatch(addProduct(product));
      const { auth, cart } = getState();
      let { user } = auth;
      const { userCart, cartProducts } = cart;
      if (userCart[0]) {
        const resp = await axios.patch(
          `${cartApi}${userCart[0].id}`,
          { ...userCart[0], paid: true },
          {
            headers: {
              Authorization: user.jwt,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const data = action.payload;
      if (!data.error && data[0]) {
        state.userCart = data;
        state.cartProducts = data[0].products;
        // state.emptyCart = false;
      }
    },
    addProduct: (state, action) => {
      let product = action.payload;
      const productExist = state.cartProducts.find(
        (item) => item.productId === product.productId
      );

      if (!productExist) {
        state.cartProducts = [product, ...state.cartProducts];
      } else {
        cartSlice.caseReducers.increaseProductQuantity(state, action);
      }
    },
    resetCart: (state) => {
      state.userCart = [];
      state.cartProducts = [];
      state.cartsHistory = [];
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      state.cartProducts = state.cartProducts.filter(
        (product) => product.productId !== id
      );
    },
    increaseProductQuantity: (state, action) => {
      const id = action.payload.productId
        ? action.payload.productId
        : action.payload;
      state.cartProducts.find((item) => item.productId === id).quantity++;
    },
    decreaseProductQuantity: (state, action) => {
      const id = action.payload;
      const productQuantity = (state.cartProducts.find(
        (item) => item.productId === id
      ).quantity -= 1);
      if (productQuantity <= 0) {
        cartSlice.caseReducers.removeProduct(state, action);
      }
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    setCartSummary: (state, action) => {
      state.cartSummary = action.payload;
    },
    setCartHistory: (state, action) => {
      state.cartsHistory = action.payload;
    },
    setCurrentCartHistory: (state, action) => {
      state.currentCartHistory = action.payload;
    },
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      // while the fetching status is pending
      state.isLoading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      // when data is successfully fecthed
      state.isLoading = false;
    },
    [getCart.rejected]: (state) => {
      // when error occurs
      state.isLoading = false;
    },
    [getCartHistory.pending]: (state) => {
      // while the fetching status is pending
      state.isLoading = true;
    },
    [getCartHistory.fulfilled]: (state) => {
      // when data is successfully fecthed
      state.isLoading = false;
    },
    [getCartHistory.rejected]: (state) => {
      // when error occurs
      state.isLoading = false;
    },
  },
});

export const {
  setCart,
  addProduct,
  resetCart,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  setSubtotal,
  setCartSummary,
  setCartHistory,
  setCurrentCartHistory,
} = cartSlice.actions;
export default cartSlice.reducer;
