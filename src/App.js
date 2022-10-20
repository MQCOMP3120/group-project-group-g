import { useEffect } from "react";
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
} from "./pages";
import { useSelector, useDispatch } from "react-redux";
import { setUser, signIn } from "./features/userAuth/authSlice";
import { getProducts, getBrands } from "./features/products/filterSlice";

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
    }
  }, []);

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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
