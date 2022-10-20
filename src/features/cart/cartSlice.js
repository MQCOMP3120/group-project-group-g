import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi, cartUserApi } from "../../util/api";
import axios from "axios";

const initialState = {
  userCart: [],
  cartProducts: [],
  isLoading: false,
  emptyCart: false,
};

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

// delete a cart / clear all items in current cart
export const delCart = createAsyncThunk(
  "cart/postCart",
  async (arg, { getState, dispatch }) => {
    try {
      const { auth, cart } = getState();
      let { user } = auth;
      const { userCart } = cart;
      const { data } = await axios.delete(`${cartApi}${userCart[0].id}`, {
        headers: {
          Authorization: user.jwt,
        },
      });
      dispatch(resetCart(data));
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
      console.log(cart);
      //   console.log(userCart);
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
        console.log(resp);
      } else {
        console.log("user cart don't exist");
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
      //   console.log(state.userCart);
    },
    addProduct: (state, action) => {
      state.cartProducts = [action.payload, ...state.cartProducts];
      //   console.log(state.cartProducts);
    },
    resetCart: (state) => {
      state.userCart = [];
      state.cartProducts = [];
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      state.cartProducts = state.cartProducts.filter(
        (product) => product.productId !== id
      );
      console.log(state.cartProducts);
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
  },
});

export const { setCart, addProduct, resetCart, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
