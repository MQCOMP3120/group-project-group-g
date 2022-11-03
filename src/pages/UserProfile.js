import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/userAuth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { resetCart } from "../features/cart/cartSlice";
import { Button } from "react-bootstrap";
import {
  getCartHistory,
  setCurrentCartHistory,
} from "../features/cart/cartSlice";
import Table from "react-bootstrap/Table";
import { AiFillEdit } from "react-icons/ai";
import Loading from "../components/Loading";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSignIn } = useSelector((state) => state.auth);
  const { cartsHistory, isLoading } = useSelector((state) => state.cart);
  const { address, email, phone, username } = user;
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);

  useEffect(() => {
    if (!isSignIn) {
      navigate("/");
    }
  }, [isSignIn]);

  useEffect(() => {
    if (isSignIn) {
      dispatch(getCartHistory());
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetCart());
  };

  const cartHistoryElm = (carts) => {
    return carts.map((cart, idx) => {
      return (
        <tr key={cart.id}>
          <td> #{cart.id.slice(-4)} </td>
          <td> {cart.timestamp.split("T")[0]}</td>
          <td> ${cart.subtotal.toFixed(2)} </td>
          <td>
            {" "}
            <Link
              onClick={() => dispatch(setCurrentCartHistory(cart))}
              to={`/orders/${cart.id}`}
            >
              {" "}
              view{" "}
            </Link>{" "}
          </td>
        </tr>
      );
    });
  };

  const userDetails = () => {
    return (
      <div className="account-content">
        <div className="user-info-field">
          <p> Username: {username} </p>
          <AiFillEdit className="edit-icon" />
        </div>
        <div className="user-info-field">
          <p> Email: {email}</p>
        </div>
        <div className="user-info-field">
          <p> Address: {address}</p>
        </div>
        <div className="user-info-field">
          <p> Phone Number: {phone}</p>
        </div>

        <Button variant="outline-danger" onClick={() => handleSignOut()}>
          {" "}
          log out{" "}
        </Button>
      </div>
    );
  };

  return (
    <Wrapper className="my-5 center-items">
      <div className="container">
        <div className="btn-group">
          <Button
            variant={!orderHistoryOpen ? "primary" : "light"}
            onClick={() => setOrderHistoryOpen(false)}
          >
            {" "}
            Account{" "}
          </Button>
          <Button
            variant={orderHistoryOpen ? "primary" : "light"}
            onClick={() => setOrderHistoryOpen(true)}
          >
            {" "}
            Order History{" "}
          </Button>
        </div>
        {orderHistoryOpen ? (
          <div className="orderhistory-content">
            {cartsHistory && cartsHistory.length > 0 ? (
              <Table striped>
                <thead>
                  <tr>
                    <th> # </th>
                    <th> Date </th>
                    <th> Total </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>{cartHistoryElm(cartsHistory)}</tbody>
              </Table>
            ) : (
              <p>No purchase history </p>
            )}
          </div>
        ) : (
          userDetails()
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 40vh;
  p {
    font-size: larger;
  }
  .container {
    max-width: 40vw;
  }
  .btn-group {
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
  .user-info-field {
    display: flex;
    justify-content: space-between;
  }
  .edit-icon {
    cursor: pointer;
  }
`;
