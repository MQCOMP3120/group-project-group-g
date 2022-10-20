import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/userAuth/authSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../features/cart/cartSlice";
import { Button } from "react-bootstrap";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSignIn } = useSelector((state) => state.auth);
  const { address, email, phone, username } = user;

  useEffect(() => {
    if (!isSignIn) {
      navigate("/");
    }
  }, [isSignIn]);

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetCart());
  };
  return (
    <Wrapper className="section-center my-5">
      <p> Username: {username} </p>
      <p> Email: {email}</p>
      <Button variant="outline-danger" onClick={() => handleSignOut()}>
        {" "}
        log out{" "}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.section``;
