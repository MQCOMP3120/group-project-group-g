import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/userAuth/authSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../features/cart/cartSlice";
import { Button } from "react-bootstrap";
import { getCartHistory } from "../features/cart/cartSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSignIn } = useSelector((state) => state.auth);
  const { cartsHistory, isLoading } = useSelector((state) => state.cart);
  const { address, email, phone, username } = user;
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);
  const { allProducts } = useSelector((state) => state.filter);

  useEffect(() => {
    if (!isSignIn) {
      navigate("/");
    }
  }, [isSignIn]);

  useEffect(() => {
    if (isSignIn) {
      dispatch(getCartHistory());
      console.log(cartsHistory);
    }
  }, []);

  if (isLoading) {
    return <h1> Loading .... </h1>;
  }

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetCart());
  };

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  // const productsElem = (products) => {
  //   return (
  //     products.map(product => {
  //       return <div>
  //         <p> </p>
  //       </div>
  //     })
  //     )
  // }

  const cartHistoryElm = (carts) => {
    return carts.map((cart) => {
      return (
        <div>
          <p> Order ID {cart.id} </p>
        </div>
      );
    });
  };

  return (
    <Wrapper className="my-5 center-items">
      <div className="container">
        <div className="btn-group">
          <Button variant="light" onClick={() => setOrderHistoryOpen(false)}>
            {" "}
            Account{" "}
          </Button>
          <Button variant="light" onClick={() => setOrderHistoryOpen(true)}>
            {" "}
            Order History{" "}
          </Button>
        </div>
        {orderHistoryOpen ? (
          <div className="orderhistory-content">
            {cartsHistory && cartsHistory.length > 0 ? (
              <div> {cartHistoryElm(cartsHistory)} </div>
            ) : (
              <p>No purchase history </p>
            )}
          </div>
        ) : (
          <div className="account-content">
            <p> Username: {username} </p>
            <p> Email: {email}</p>
            <p> Address: {address}</p>
            <p> Phone Number: {phone}</p>
            <Button variant="outline-danger" onClick={() => handleSignOut()}>
              {" "}
              log out{" "}
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  p {
    font-size: larger;
  }
  .container {
    max-width: 40vw;
  }
  .btn-group {
    background-color: aliceblue;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    button {
      border-radius: 0;
    }
  }
  .account-content {
    /* border: 1px solid grey; */
    padding: 3rem;
  }
  .orderhistory-content {
    padding: 3rem;
  }
`;
