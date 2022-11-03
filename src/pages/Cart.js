import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  delCart,
  delCartProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  putCart,
  payCart,
  postCartHistory,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";
import { toast } from "react-toastify";
import { serverUrl } from "../util/api";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn } = useSelector((state) => state.auth);
  const { userCart, isLoading, cartProducts } = useSelector(
    (state) => state.cart
  );

  const { allProducts } = useSelector((state) => state.filter);
  let stripeCartSummary = [];

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
    const notifyProductRemove = () =>
      toast.warn("Product removed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    dispatch(delCartProduct(id));

    if (cartProducts.length <= 1) {
      // dispatch(delCart());
    }
    notifyProductRemove();
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

  const subtotalAndSummary = () => {
    let total = 0;
    stripeCartSummary = [];
    cartProducts.forEach((product, idx) => {
      const { price, title } = getProduct(product.productId)[0];
      total += price * product.quantity;

      //cart summary send to stripe
      stripeCartSummary = stripeCartSummary.concat({
        id: idx,
        title: title,
        price: price,
        quantity: product.quantity,
      });
    });

    // dispatch(setSubtotal(total))
    return total;
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

  // stripe
  const stripePay = (e) => {
    e.preventDefault();
    // dispatch(payCart());
    // dispatch(postCartHistory());
    // dispatch(delCart());

    fetch(`${serverUrl}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send along all the information about the items
      body: JSON.stringify({
        items: [...stripeCartSummary],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        // If there is an error then make sure we catch that
        return res.json().then((e) => Promise.reject(e));
      })
      .then(({ url }) => {
        // On success redirect the customer to the returned URL

        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });

    // console.log(cartSummary);
  };

  return (
    <Wrapper className="section-center h-100">
      <h3 className="my-5"> Cart </h3>
      {productElem}
      {userCart[0] && cartProducts.length >= 1 && (
        <>
          <h2 className="my-2"> Subtotal: ${subtotalAndSummary()}</h2>
          <div className="buttons">
            <Button
              variant="outline-danger"
              size="md"
              className="clear-btn"
              // onClick={() => dispatch(delCart())}
            >
              {" "}
              Clear Cart{" "}
            </Button>
            <Button
              variant="primary"
              className="checkout-btn"
              onClick={stripePay}
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
