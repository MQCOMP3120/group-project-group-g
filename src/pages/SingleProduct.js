import React from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Button } from "react-bootstrap";
import { BiHeart } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";
import RatingStars from "../components/RatingStars";
import { useSelector } from "react-redux";

export default function SingleProduct() {
  const { productId } = useParams();
  const { allProducts, isLoading } = useSelector((state) => state.filter);

  const productInfo = allProducts.filter(
    (product) => product.id === productId
  )[0];

  if (isLoading || !productInfo) {
    return <h1> Loading .... </h1>;
  }

  const { id, image, title, price, rating, description } = productInfo;
  return (
    <Wrapper className="section-center">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item active> {title} </Breadcrumb.Item>
      </Breadcrumb>
      <div className="content">
        <div className="img-container center-items">
          <img src={image} alt={title} />
        </div>
        <div className="product-info mt-5 px-3">
          <h3> {title} </h3>
          <RatingStars rating={rating} />
          <b>{`$ ${price}`}</b>
          <p className="product-description">{description}</p>
          <div className="btn-group my-4">
            <Button variant="primary">
              <AiOutlineShoppingCart /> Add to Cart
            </Button>{" "}
            <Button variant="light">
              {" "}
              <BiHeart /> Add to Wish List
            </Button>{" "}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  b {
    font-size: 2rem;
  }
  img {
    height: 400px;
    width: 400px;
  }
  .content {
    min-height: 60vh;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
  .btn-group {
    display: flex;
    justify-content: space-around;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;