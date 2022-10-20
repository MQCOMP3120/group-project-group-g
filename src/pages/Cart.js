import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  delCart,
  removeProduct,
  putCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn } = useSelector((state) => state.auth);
  const { userCart, isLoading, cartProducts } = useSelector(
    (state) => state.cart
  );
  const { allProducts } = useSelector((state) => state.filter);
  useEffect(() => {
    if (!isSignIn) {
      navigate("/login");
    } else {
      dispatch(getCart());
    }
  }, []);

  // useEffect(() => {
  //   dispatch(putCart());
  // }, [cartProducts]);

  if (isLoading) {
    return <h1> Loading ... </h1>;
  }

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  // const handleRemoveCartItem = (id) => {
  //   dispatch(removeProduct(id));

  // };

  const emptyCart = <p> Your cart is currently empty </p>;
  const productElem = !userCart[0]
    ? emptyCart
    : cartProducts.map((product) => {
        const { title, price, id } = getProduct(product.productId)[0];
        // console.log(id);
        return (
          <div className="single-product-info my-5">
            <p>{title}</p>
            <p>quantity: {product.quantity}</p>
            <p>price: {`$${price}`} </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => dispatch(removeProduct(id))}
            >
              {" "}
              Delete{" "}
            </Button>
          </div>
        );
      });

  return (
    <Wrapper className="section-center h-100">
      <h3 className="my-5"> My Cart </h3>

      {/*
      <div className="category">
        <p>Product</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>
      <hr /> */}
      {productElem}
      {userCart[0] && (
        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => dispatch(delCart())}
        >
          {" "}
          Clear{" "}
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .single-product-info {
    display: flex;
    justify-content: space-around;
  }
`;
