import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  delCart,
  delCartProduct,
  removeProduct,
  payCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  putCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styled from "styled-components";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn } = useSelector((state) => state.auth);
  const { userCart, isLoading, cartProducts } = useSelector(
    (state) => state.cart
  );
  const { allProducts } = useSelector((state) => state.filter);
  useEffect(() => {
    if (!isSignIn) {
      navigate("/login");
    } else {
      dispatch(getCart());
    }
    console.log(cartProducts);
    // console.log(userCart);
  }, []);

  // useEffect(() => {
  //   dispatch(putCart());
  // }, [cartProducts]);

  if (isLoading) {
    return <h1> Loading ... </h1>;
  }

  const handleRemoveCartItem = (id) => {
    dispatch(delCartProduct(id));
  };

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  const emptyCart = <p> Your cart is currently empty </p>;
  const productElem = !userCart[0]
    ? emptyCart
    : cartProducts.map((product, idx) => {
        const { title, price, id } = getProduct(product.productId)[0];
        return (
          <div className="single-product-info my-5" key={idx}>
            <p>{title}</p>
            <div className="quantity">
              <AiOutlineMinusCircle
                className="icon"
                size={20}
                onClick={() => dispatch(decreaseProductQuantity(id))}
              />
              <p>quantity: {product.quantity}</p>
              <AiOutlinePlusCircle
                className="icon"
                size={20}
                onClick={() => dispatch(increaseProductQuantity(id))}
              />
            </div>
            <p>price: {`$${price}`} </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveCartItem(id)}
              //onClick={() => console.log(id)}
            >
              {" "}
              Delete{" "}
            </Button>
          </div>
        );
      });

  return (
    <Wrapper className="section-center h-100">
      <h3 className="my-5"> My Cart </h3>
      {productElem}
      {userCart[0] && (
        <div className="btn-group">
          <Button
            variant="outline-danger"
            size="lg"
            onClick={() => dispatch(delCart())}
          >
            {" "}
            Clear{" "}
          </Button>
          <Button variant="primary" onClick={() => dispatch(payCart())}>
            {" "}
            Check Out{" "}
          </Button>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .single-product-info {
    display: flex;
    justify-content: space-around;
  }
  .quantity {
    display: flex;
    flex-direction: row;
  }
  .icon:hover {
    color: blue;
    cursor: pointer;
  }
  .icon {
    margin: 5px;
  }
  .btn-group {
    display: flex;
  }
`;
