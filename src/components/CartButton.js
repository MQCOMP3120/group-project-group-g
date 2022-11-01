import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";

export default function CartButton() {
  const { cartProducts } = useSelector((state) => state.cart);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    setTotalQuantity(
      cartProducts.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0)
    );
  }, [cartProducts]);

  return (
    <Wrapper>
      {cartProducts.length > 0 && <p>{totalQuantity}</p>}
      <AiOutlineShoppingCart size={25} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  p {
    font-size: smaller;
    position: absolute;
    right: -10px;
    top: -7px;
    color: antiquewhite;
    border-radius: 100%;
    background-color: red;
    width: 18px;
    height: 18px;
    text-align: center;
  }
`;
