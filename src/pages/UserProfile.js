import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const { address, email, phone, username } = user;
  return (
    <Wrapper className="section-center">
      <p> {username} </p>
      <p> {email}</p>
    </Wrapper>
  );
}

const Wrapper = styled.section``;
