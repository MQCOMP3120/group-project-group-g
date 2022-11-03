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
import { putCart, postCart, addProduct } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function WishList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn } = useSelector((state) => state.auth);
  const { productList, isLoading } = useSelector((state) => state.wish);
  const { allProducts } = useSelector((state) => state.filter);
  const { userCart } = useSelector((store) => store.cart);

  useEffect(() => {
    if (!isSignIn) {
      navigate("/login");
    } else {
      dispatch(getWishList());
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleAddProduct = (productId) => {
    dispatch(addProduct({ productId: productId, quantity: 1 }));
    if (userCart[0]) {
      // if current user cart exist then add product into the cart
      dispatch(putCart());
    } else {
      // otherwise make a new cart for current user
      dispatch(postCart());
    }
  };

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
            <div className="component">
              <img
                src={image}
                width="50"
                height="50"
                alt={title}
                onClick={() => navigate(`/products/${id}`)}
              />
              <div className="img-text">{title}</div>
            </div>
            <p>
              &emsp; Price: {`$${price}`}
              &emsp;
              <Button
                variant="danger"
                size="sm"
                onClick={() => dispatch(delWishList(id))}
              >
                {" "}
                Remove{" "}
              </Button>
              &emsp;
              <Button
                className="add-cart"
                onClick={() => {
                  const notifyAddProduct = () =>
                    toast.success("Product added to the cart", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  notifyAddProduct();
                  handleAddProduct(id);
                }}
              >
                {" "}
                Add to cart{" "}
              </Button>
            </p>
          </div>
        );
      });

  return (
    <Wrapper className="section-center h-100">
      <h3 className="my-5"> Wish List </h3>
      {productElem}
      {productList[0] && (
        <Button
          variant="outline-danger"
          size="md"
          className="buttons"
          onClick={() => dispatch(delWishLists())}
        >
          {" "}
          Clear Wish List{" "}
        </Button>
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
    flex-direction: row;
    align-items: flex-end;
  }
  .add-cart {
    background-color: #444444;
    justify-content: center;
    padding: 5px 10px;
    font-size: 14px;
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
