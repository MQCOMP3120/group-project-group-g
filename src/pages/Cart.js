import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  delCart,
  delCartProduct,
  setCartSummary,
  payCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  putCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";

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

  if (isLoading) {
    return <h1> Loading ... </h1>;
  }

  const handleRemoveCartItem = (id) => {
    dispatch(delCartProduct(id));

    if (cartProducts.length <= 1) {
      dispatch(delCart());
    }
  };

  const handleQuantityIncrease = (id) => {
    dispatch(increaseProductQuantity(id));
    dispatch(putCart());
  };

  const handleQuantityDecrease = (id) => {
    dispatch(decreaseProductQuantity(id));
    dispatch(putCart());
  };

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  const calculateSubtotal = () => {
    let total = 0;
    cartProducts.forEach((product) => {
      const { price } = getProduct(product.productId)[0];
      total += price * product.quantity;
    });

    // dispatch(setSubtotal(total))
    return total;
  };

  const handleCheckout = () => {
    const cartSummary = {
      cartProducts: cartProducts,
      subtotal: calculateSubtotal(),
    };
    dispatch(setCartSummary(cartSummary));
    navigate("/payment");
  };

  const emptyCart = <p> Your cart is currently empty </p>;
  const productElem =
    !userCart[0] || cartProducts.length < 1
      ? emptyCart
      : cartProducts.map((product, idx) => {
          const { title, price, id, image } = getProduct(product.productId)[0];

          return (
            <div className="single-product-info my-5" key={idx}>
              <div className="component">
                <img
                  src={image}
                  width="50"
                  height="50"
                  alt={title}
                  onClick={() => navigate(`/products/${id}`)}
                />
                <div className="img-text">
                  {title}
                  <div className="quantity">
                    <AiOutlineMinusCircle
                      className="icon"
                      size={20}
                      onClick={() => handleQuantityDecrease(id)}
                    />
                    Qty: {product.quantity}
                    <AiOutlinePlusCircle
                      className="icon"
                      size={20}
                      onClick={() => handleQuantityIncrease(id)}
                    />
                  </div>
                </div>
              </div>
              <p>
                Price: {`$${price * product.quantity}`} &emsp;
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveCartItem(id)}
                >
                  {" "}
                  Remove{" "}
                </Button>
              </p>
            </div>
          );
        });

  return (
    <Wrapper className="section-center h-100">
      <h3 className="my-5"> Cart </h3>
      {productElem}
      {userCart[0] && cartProducts.length >= 1 && (
        <>
          <h2 className="my-2"> Subtotal: ${calculateSubtotal()}</h2>
          <div className="buttons">
            <Button
              variant="outline-danger"
              size="md"
              className="clear-btn"
              onClick={() => dispatch(delCart())}
            >
              {" "}
              Clear Cart{" "}
            </Button>
            <Button
              variant="primary"
              className="checkout-btn"
              onClick={() => handleCheckout()}
            >
              {" "}
              Check Out{" "}
            </Button>
          </div>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .single-product-info {
    display: flex;
    justify-content: space-between;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
  .checkout-btn {
    background-color: #444444;
    justify-content: center;
    padding: 10px 75px;
    font-size: 16px;
    border-radius: 4px;
  }

  .component {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .quantity {
    display: flex;
    flex-direction: row;
  }
  .img-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 54px;
    text-align: right;
  }
  h3 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
  }

  .icon:hover {
    color: blue;
    cursor: pointer;
  }
  .icon {
    margin: 3px;
  }
  img {
    cursor: pointer;
  }
`;
