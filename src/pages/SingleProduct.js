import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

import {  postWishList } from "../features/wishlist/wishlistSlice"




export default function SingleProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { allProducts, isLoading } = useSelector((state) => state.filter);
  const { user, isSignIn } = useSelector((store) => store.auth);
  const { userCart } = useSelector((store) => store.cart);

  const productInfo = allProducts.filter(
    (product) => product.id === productId
  )[0];

  useEffect(() => {
    if (isSignIn && user.jwt) {
      dispatch(getCart());
    }
    if (!userCart[0]) {
      console.log("empty cart");
    }
  }, [isLoading]);

  if (isLoading || !productInfo) {
    return <h1> Loading .... </h1>;
  }

  const handleAddProduct = (productId) => {
    dispatch(addProduct({ productId: productId, quantity: 1 }));
    if (userCart[0]) {
      // if current user cart exist then add product into the cart
      dispatch(putCart());
    } else {
      // otherwise make a new cart for current user
      dispatch(postCart());
    }
  };

  const { id, image, title, price, rating, description } = productInfo;
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
          <RatingStars rating={rating} />
          <b>{`$ ${price}`}</b>
          <p className="product-description">{description}</p>
          <div className="btn-group my-4">
            <Button variant="primary" onClick={() => handleAddProduct(id)}>
              <AiOutlineShoppingCart /> Add to Cart
            </Button>{" "}
            <Button variant="light" onClick={() => dispatch(postWishList(id))}>
              {" "}
              <BiHeart /> Add to Wish List
            </Button>{" "}
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
