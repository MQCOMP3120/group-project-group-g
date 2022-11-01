import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ handlePayment, total }) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="container mt-5 px-5">
        <div className="mb-4">
          <h2>Confirm order and pay</h2>
          <span>
            please make the payment, after that you can enjoy all the features
            and benefits.
          </span>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="card p-3">
              <h6 className="text-uppercase">Payment details</h6>
              <div className="inputbox mt-3">
                {" "}
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required="required"
                />{" "}
                <span>Name on card</span>{" "}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    {" "}
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required="required"
                    />{" "}
                    <i className="fa fa-credit-card"></i>{" "}
                    <span>Card Number</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-row">
                    <div className="inputbox mt-3 mr-2">
                      {" "}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />{" "}
                      <span>Expiry</span>{" "}
                    </div>

                    <div className="inputbox mt-3 mr-2">
                      {" "}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />{" "}
                      <span>CVV</span>{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 mb-4">
                <h6 className="text-uppercase">Shipping Address</h6>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      {" "}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />{" "}
                      <span>Street Address</span>{" "}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      {" "}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />{" "}
                      <span>City</span>{" "}
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      {" "}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />{" "}
                      <span>State/Province</span>{" "}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="inputbox mt-3 mr-2">
                      {" "}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required="required"
                      />{" "}
                      <span>Zip code</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4 d-flex justify-content-between">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              >
                {" "}
                <BsArrowLeft /> Back to Cart
              </span>
              <button className="btn btn-success px-3" onClick={handlePayment}>
                Pay ${total}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .container {
    height: 80vh;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .card {
    border: none;
  }

  .form-control {
    border-bottom: 2px solid #eee !important;
    border: none;
    font-weight: 600;
  }

  .form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none;
    border-radius: 0px;
    border-bottom: 2px solid blue !important;
  }

  .inputbox {
    position: relative;
    margin-bottom: 20px;
    width: 100%;
  }

  .inputbox span {
    position: absolute;
    top: 7px;
    left: 11px;
    transition: 0.5s;
  }

  .inputbox i {
    position: absolute;
    top: 13px;
    right: 8px;
    transition: 0.5s;
    color: #3f51b5;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .inputbox input:focus ~ span {
    transform: translateX(-0px) translateY(-15px);
    font-size: 12px;
  }

  .inputbox input:valid ~ span {
    transform: translateX(-0px) translateY(-15px);
    font-size: 12px;
  }

  .card-blue {
    background-color: #492bc4;
  }

  .hightlight {
    background-color: #5737d9;
    padding: 10px;
    border-radius: 10px;
    margin-top: 15px;
    font-size: 14px;
  }

  .yellow {
    color: #fdcc49;
  }

  .decoration {
    text-decoration: none;
    font-size: 14px;
  }

  .btn-success {
    color: #fff;
    background-color: #492bc4;
    border-color: #492bc4;
  }

  .btn-success:hover {
    color: #fff;
    background-color: #492bc4;
    border-color: #492bc4;
  }

  .decoration:hover {
    text-decoration: none;
    color: #fdcc49;
  }
`;
