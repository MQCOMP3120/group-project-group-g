import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchModal from "./components/SearchModal";
import {
  Home,
  Cart,
  Login,
  Products,
  Register,
  SingleProduct,
  SingleBrand,
  UserProfile,
  WishList,
  ErrorPage,
  Payment,
  SingleOrderHistory,
} from "./pages";
import Success from './pages/success'

import { useSelector, useDispatch } from "react-redux";
import { setUser, signIn } from "./features/userAuth/authSlice";
import { getProducts, getBrands } from "./features/products/filterSlice";
import { getCart } from "./features/cart/cartSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DevHome from "./services/devhomepage";
import Stage from "./services/stage";


function App() {
  const dispatch = useDispatch();
  const { searchModalOpen } = useSelector((store) => store.search);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());

    const loggedUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedUser) {
      dispatch(setUser(loggedUser));
      dispatch(signIn());
      dispatch(getCart());
    }
  }, []);

  const [keyWords, setkeyWords] = useState({
    homeState: "init",
    username: "",
    jwt: "",
    userId: "",
    // "username": "ben",
    // "jwt": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzU5MTc1MGE1YjIxNDM2YmI5OGYxOCIsInVzZXJuYW1lIjoiYmVuIiwiaWF0IjoxNjY0NDU1MDkwfQ.uX8K85oud9-xqmVjIhJYPR7exgrgMuBqiP64mZEbh04",
  });

  const modifyKeyWords = (info) => {
    setkeyWords(info);
  };

  return (
    <BrowserRouter>
      {searchModalOpen && <SearchModal />}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/brands/:brandId" element={<SingleBrand />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders/:orderId" element={<SingleOrderHistory />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/devhome"
          element={<DevHome fn={modifyKeyWords} keyWords={keyWords} />}
        />
        <Route
          path="/stage"
          element={<Stage fn={modifyKeyWords} keyWords={keyWords} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
