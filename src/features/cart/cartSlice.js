import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi, cartUserApi, productsApi } from "../../util/api";
import axios from "axios";

const initialState = {
  userCart: [],
  cartProducts: [],
  isLoading: false,
  emptyCart: false,
  subtotal: 0,
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

export const delCartProduct = createAsyncThunk(
  "cart/delCartProduct",
  async (id, { getState, dispatch }) => {
    try {
      const { auth, cart } = getState();
      let { user } = auth;
      const { userCart, cartProducts } = cart;
      // console.log(cart);
      //   console.log(userCart);
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
        // console.log(resp);
      } else {
        console.log("user cart doesn't exist");
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
      // console.log(cart);
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
        // console.log(resp);
      } else {
        console.log("user cart doesn't exist");
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
        console.log(userCart)
        console.log(resp);
      } else {
        console.log("user cart doesn't exist");
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
      let product = action.payload;
      const productExist = state.cartProducts.find(
        (item) => item.productId === product.productId
      );

      if (!productExist) {
        state.cartProducts = [product, ...state.cartProducts];
      } else {
        cartSlice.caseReducers.increaseProductQuantity(state, action);
        console.log("produyct exosty");
      }
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
    },
    increaseProductQuantity: (state, action) => {
      const id = action.payload.productId
        ? action.payload.productId
        : action.payload;
      state.cartProducts.find((item) => item.productId === id).quantity++;
    },
    decreaseProductQuantity: (state, action) => {
      const id = action.payload;
      //console.log(id);
      const productQuantity = state.cartProducts.find(
        (item) => item.productId === id
      ).quantity--;

      if (productQuantity <= 1) {
        cartSlice.caseReducers.removeProduct(state, action);
      }
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload
    }
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

export const {
  setCart,
  addProduct,
  resetCart,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  setSubtotal
} = cartSlice.actions;
export default cartSlice.reducer;
