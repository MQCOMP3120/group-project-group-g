import React, { useEffect } from "react";
import {
  delCart,
  payCart,
  postCartHistory,
  getCart,
} from "../features/cart/cartSlice";
import { setHideNavBarTrue } from "../features/navbar/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Success() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(getCart());
    dispatch(setHideNavBarTrue());
  }, []);

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  const calculateTotal = () => {
    let total = 0;

    if (cartProducts[0]) {
      cartProducts.forEach((product) => {
        const { price } = getProduct(product.productId)[0];
        total += price * product.quantity;
      });
    }

    return total;
  };

  const handleContinue = () => {
    dispatch(payCart());
    dispatch(postCartHistory(calculateTotal()));
    dispatch(delCart());
  };

  return (
    <Wrapper className="section-center center-items">
      <h1 className="mb-5"> Payment Successful </h1>
      <Link to={"/products"} onClick={() => handleContinue()}>
        {" "}
        Continue Shopping
      </Link>
    </Wrapper>
  );
}

export default Success;

const Wrapper = styled.section`
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
`;
