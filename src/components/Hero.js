import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Hero() {
  return (
    <Wrapper className="section-center">
      <article className="hero-text">
        <h1>Your Ideal Online Mobile Phone Store</h1>
        <p>
          Shop the latest Phones from all popular brands at the lowest prices
        </p>
        <Button as={Link} to="/products" className="button">
          {" "}
          Shop Now{" "}
        </Button>
      </article>
      <article className="img-container">
        <img
          className="hero-img"
          id="img-1"
          src="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/596686-Product-0-I-637982215683748466_300x300.jpg?v=1662701000"
        />
        <img
          className="hero-img"
          id="img-2"
          src="https://cdn.shopify.com/s/files/1/0024/9803/5810/products/598448-Product-0-I-637947050615176953_300x300.jpg?v=1664423566"
        />
      </article>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
  h1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 72px;
    display: flex;
    align-items: center;
  }
  .button {
    background-color: #444444;
    color: white;
    padding: 12px 50px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    border-radius: 4px;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    font-size: 1rem;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 10rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .img-container {
      display: block;
      position: relative;
      height: 75vh;
      width: 35vw;
    }
    .hero-img {
      padding: 10px 0;
    }
    #img-1 {
      bottom: 5vh;
      right: 0;
      position: absolute;
      height: 36vh;
    }
    #img-2 {
      top: 0;
      position: absolute;
      height: 36vh;
    }
  }
`;
