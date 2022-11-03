import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { payCart, delCart, postCartHistory } from "../features/cart/cartSlice";

export default function SuccessFulPayment() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // console.log(cartSummary);
  //   // dispatch(payCart());
  //   // dispatch(postCartHistory());
  //   // dispatch(delCart());
  // }, []);

  return <Wrapper></Wrapper>;
}

const Wrapper = styled.section`
  height: 100vh;
  iframe {
    width: 100vw;
    height: 100vh;
  }
`;
