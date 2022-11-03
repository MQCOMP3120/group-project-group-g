import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <Wrapper className="center-items">
      <div className="lds-dual-ring"></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 70vh;
  width: 100vw;

  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 174px;
    height: 174px;
    margin: 8px;
    border-radius: 50%;
    border: 16px solid #467fd0;
    border-color: #467fd0 transparent #467fd0 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
