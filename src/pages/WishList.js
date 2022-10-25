import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishList,
  delWishList,
  delWishLists,
  //setWishList, addWishList, removeWishList, removeWishLists,
} from "../features/wishlist/wishlistSlice";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";

export default function WishList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn } = useSelector((state) => state.auth);
  const { productList, isLoading } = useSelector((state) => state.wish);
  const { allProducts } = useSelector((state) => state.filter);

  useEffect(() => {
    if (!isSignIn) {
      navigate("/login");
    } else {
      dispatch(getWishList());
    }
  }, []);

  if (isLoading) {
    return <h1> Loading ... </h1>;
  }

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  const emptyWish = <p> Your wish list is currently empty </p>;
  const productElem = !productList[0]
    ? emptyWish
    : productList.map((product, idx) => {
        const { title, price, id, image } = getProduct(product.productId)[0];
        // console.log(id);
        return (
          <div className="single-product-info my-5" key={idx}>
            <p>
              <img src={image} width="100" height="100" />
              &ensp;
              {title}
              &emsp; price: {`$${price}`}
              &emsp;
              <Button
                variant="danger"
                size="sm"
                onClick={() => dispatch(delWishList(id))}
              >
                {" "}
                Delete{" "}
              </Button>
            </p>
          </div>
        );
      });

  return (
    <Wrapper className="section-center h-100">
      <h3 className="my-5"> My Wish List </h3>
      {productElem}
      {productList[0] && (
        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => dispatch(delWishLists())}
        >
          {" "}
          Clear{" "}
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .single-product-info {
    display: flex;
    justify-content: space-around;
  }
`;
