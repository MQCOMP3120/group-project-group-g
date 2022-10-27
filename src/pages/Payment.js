import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { payCart, delCart, postCartHistory } from "../features/cart/cartSlice";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartSummary } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.filter);

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  console.log(cartSummary);

  const handlePayment = () => {
    dispatch(payCart());
    dispatch(postCartHistory());
    dispatch(delCart());
    navigate("/products");
  };
  const summary = cartSummary.cartProducts ? (
    cartSummary.cartProducts.map((product) => {
      const { price, title, image } = getProduct(product.productId)[0];

      return (
        <div key={product.productId} className="products my-5">
          <img src={image} alt={title} width="40px" height="40px" />
          <p> {title} </p>
          <p> x{product.quantity} </p>
          <p> ${price} </p>
        </div>
      );
    })
  ) : (
    <p> Something went wrong, please try again later </p>
  );
  return (
    <Wrapper className="mx-5">
      <div className="payment-summary my-5">
        <h3> Summary </h3>
        {summary}
        <hr />
        <p>Total</p>
        <h3> ${cartSummary.subtotal}</h3>
      </div>
      <Button onClick={() => handlePayment()}> Pay </Button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .products {
    display: flex;
    justify-content: space-around;
  }
  .payment-summary {
    max-width: 30vw;
    padding: 20px;
    border: 1px solid grey;
    border-radius: 15px;
  }
`;
