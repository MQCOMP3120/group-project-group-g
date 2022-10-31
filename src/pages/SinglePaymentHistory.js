import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

export default function SinglePaymentHistory() {
  const navigate = useNavigate();
  const { currentCartHistory } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.filter);

  const getProduct = (id) => {
    return allProducts.filter((product) => product.id === id);
  };

  useEffect(() => {
    if (currentCartHistory.products === undefined) {
      navigate("*");
    }
  }, []);

  const summaryElem =
    currentCartHistory.products &&
    currentCartHistory.products.map((product) => {
      const { title, price, id, image } = getProduct(product.productId)[0];
      return (
        <tr>
          <td>{title}</td>
          <td>x {product.quantity}</td>
          <td>${(price * product.quantity).toFixed(2)}</td>
        </tr>
      );
    });

  return (
    <section className="section-center mt-5">
      <Link to={"/userprofile"}>
        <BsArrowLeft size={20} className="m-3" />
        Back to Purchases
      </Link>
      <Table striped>
        <thead>
          <tr>
            <td>Product</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {summaryElem}
          <tr>
            <td>
              {" "}
              <h4>Total</h4>{" "}
            </td>
            <td></td>
            <td>
              {" "}
              <h4> ${currentCartHistory.subtotal.toFixed(2)} </h4>
            </td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
}
