import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { wishListApi} from "../../util/api"
import axios from "axios"

const initialState = {
    productList: [],
    isLoading: false,
  }

  // get current user's WishList
export const getWishList = createAsyncThunk(
"wishlist/getwishlist",
async (arg, { getState, dispatch }) => {
    try {
    const { auth } = getState();
    let { user } = auth;
    const { data } = await axios.get(wishListApi, {
        headers: {
        Authorization: user.jwt,
        },
    });

    dispatch(setWishList(data));
    } catch (err) {
    console.log(err);
    }
}
)

// create a new WishList
export const postWishList = createAsyncThunk(
    "wishlist/postwishlist",
    async (arg, { getState, dispatch }) => {
      try {
        const { auth} = getState();
        let { user } = auth;
        const { data } = await axios.post(
            wishListApi,
          { productId: arg},
          {
            headers: {
              Authorization: user.jwt,
            },
          }
        )
        dispatch(addWishList(data));
      } catch (err) {
        console.log(err)
      }
    }
  )

export const delWishList = createAsyncThunk(
  "wishlist/delwishlist",
  async (arg, { getState, dispatch }) => {
  try {
      const { auth} = getState()
      let { user } = auth
      const { data } = await axios.delete(`${wishListApi}${arg}`, {
        headers: {
          Authorization: user.jwt,
        },
      });
      dispatch(removeWishList(arg))
    } catch (err) {
      console.log(err)
    }
  }
)

// delete WishLists
export const delWishLists = createAsyncThunk(
  "wishlist/delwishlist",
  async (arg, { getState, dispatch }) => {
  try {
      const { auth} = getState()
      let { user } = auth
      const { data } = await axios.delete(wishListApi, {
        headers: {
          Authorization: user.jwt,
        },
      });
      dispatch(removeWishLists())
    } catch (err) {
      console.log(err)
    }
  }
)

  const wishListSlice = createSlice({
    name: "wish",
    initialState,
    reducers: {
      setWishList: (state, action) => {
        const data = action.payload
        if (!data.error && data[0]) {
          state.productList = data;
        }
        //console.log("setWishList", state.productList)
      },

      addWishList: (state, action) => {
        state.productList = [action.payload, ...state.productList]
        //console.log("addWishList", state.productList)
      },

      removeWishList: (state, action) => {
        const id = action.payload;
        state.productList = state.productList.filter(
          (product) => product.productId !== id
        )
        //console.log("removeWishList", state.productList)
      },
      removeWishLists: (state, action) => {
        state.productList = []
        //console.log("removeWishLists", state.productList)
      },
    },
    extraReducers: {
      [getWishList.pending]: (state) => {
        // while the fetching status is pending
        state.isLoading = true;
      },
      [getWishList.fulfilled]: (state, action) => {
        // when data is successfully fecthed
        state.isLoading = false;
      },
      [getWishList.rejected]: (state) => {
        // when error occurs
        state.isLoading = false;
      },
    },
  });

export const { setWishList, addWishList, removeWishList, removeWishLists } =
wishListSlice.actions;
export default wishListSlice.reducer;