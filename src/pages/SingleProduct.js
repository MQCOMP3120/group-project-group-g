import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button } from "react-bootstrap";
import { BiHeart } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import RatingStars from "../components/RatingStars";
import {
  addProduct,
  putCart,
  getCart,
  postCart,
} from "../features/cart/cartSlice";

import { postWishList } from "../features/wishlist/wishlistSlice";

export default function SingleProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { allProducts, isLoading } = useSelector((state) => state.filter);
  const { user, isSignIn } = useSelector((store) => store.auth);
  const { userCart, cartProducts } = useSelector((store) => store.cart);
  const { productList } = useSelector((state) => state.wish);

  const productInfo = allProducts.filter(
    (product) => product.id === productId
  )[0];

  useEffect(() => {
    if (isSignIn && user.jwt) {
      dispatch(getCart());
    }

    // if (!userCart[0]) {
    //   console.log("empty cart");
    // }
    // console.log(userCart);
  }, [isLoading]);

  if (isLoading || !productInfo) {
    return <h1> Loading .... </h1>;
  }

  const handleAddProduct = (productId) => {
    if (isSignIn) {
      dispatch(addProduct({ productId: productId, quantity: 1 }));
      if (userCart[0]) {
        // if current user cart exist then add product into the cart
        dispatch(putCart());
      } else {
        // otherwise make a new cart for current user
        dispatch(postCart());
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddToWishList = (id) => {
    if (isSignIn) {
      dispatch(postWishList(id));
    } else {
      navigate("/wishlist");
    }
  };

  const { id, image, title, price, rating, description } = productInfo;

  const productInWishlist = (id) =>
    productList.find((product) => product.productId === id);

  return (
    <Wrapper className="section-center">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item active> {title} </Breadcrumb.Item>
      </Breadcrumb>
      <div className="content">
        <div className="img-container center-items">
          <img src={image} alt={title} />
        </div>
        <div className="product-info mt-5 px-3">
          <h3> {title} </h3>
          <RatingStars rating={rating.toFixed(1)} />
          <b>{`$ ${price}`}</b>
          <p className="product-description">{description}</p>
          <div className="btn-group my-4">
            <Button variant="primary" onClick={() => handleAddProduct(id)}>
              <AiOutlineShoppingCart /> Add to Cart
            </Button>
            {productInWishlist(id) ? (
              <Button variant="light" onClick={() => navigate("/wishlist")}>
                <BiHeart color="red" /> In Wish List
              </Button>
            ) : (
              <Button variant="light" onClick={() => handleAddToWishList(id)}>
                <BiHeart /> Add to Wish List
              </Button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  b {
    font-size: 2rem;
  }
  img {
    height: 400px;
    width: 400px;
  }
  .content {
    min-height: 60vh;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
  .btn-group {
    display: flex;
    justify-content: space-around;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;
