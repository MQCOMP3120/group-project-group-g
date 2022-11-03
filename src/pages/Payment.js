import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { payCart, delCart, postCartHistory } from "../features/cart/cartSlice";
import PaymentForm from "../components/PaymentForm";
import { toast } from "react-toastify";
import { serverUrl } from "../util/api";
import { Button } from "react-bootstrap";

export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartSummary } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.filter);

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  const handlePayment = () => {
    dispatch(payCart());
    dispatch(postCartHistory());
    dispatch(delCart());
    navigate("/products");
    // const notify = () =>
    //   toast.success("Payment successful!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });

    // notify();
  };

  const stripePay = (e) => {
    e.preventDefault();
    fetch(`${serverUrl}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send along all the information about the items
      body: JSON.stringify({
        items: [
          {
            id: 1,
            title: "iphone4",
            price: 100,
            quantity: 2,
          },
          {
            id: 1,
            title: "iphone5",
            price: 100,
            quantity: 2,
          },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        // If there is an error then make sure we catch that
        return res.json().then((e) => Promise.reject(e));
      })
      .then(({ url }) => {
        // On success redirect the customer to the returned URL
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const summary = cartSummary.cartProducts ? (
    cartSummary.cartProducts.map((product) => {
      const { price, title, image } = getProduct(product.productId)[0];

      return (
        <div key={product.productId} className="products my-5">
          <img src={image} alt={title} width="40px" height="40px" />
          <p> {title} </p>
          <p> x{product.quantity} </p>
          <p> ${price} </p>
        </div>
      );
    })
  ) : (
    <p> Something went wrong, please try again later </p>
  );
  return (
    <Wrapper className="mx-5">
      <div className="content-container">
        <div className="payment-summary my-5">
          <h3> Summary </h3>
          {summary}
          <hr />
          <p>Total</p>
          <h3> ${cartSummary.subtotal}</h3>
        </div>
        <PaymentForm
          handlePayment={() => handlePayment()}
          total={cartSummary.subtotal}
        />
        <Button onClick={stripePay}> Pay </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .products {
    display: flex;
    justify-content: space-around;
  }
  .payment-summary {
    min-width: 40vw;
    padding: 20px;
    max-height: 80vh;
    overflow-y: auto;
  }
  .content-container {
    display: flex;
    justify-content: space-around;
  }
  @media screen and (max-width: 1200px) {
    .content-container {
      flex-direction: column;
    }
  }
`;
