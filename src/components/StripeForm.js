import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

export default function StripeForm() {
  const stripePromise = loadStripe(
    "pk_test_51LxJELGHziEI4ixoIhZZ2K9CsLzkcABT23CeDmdZZtSQK30qepHCMJflQ5pyKy6syj88Ga0hSGjVdkoIASOAC9SO00Ewn5BCnM"
  );

  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form action="/create-checkout-session" method="POST">
        <button type="submit">Checkout</button>
      </form>
    </section>
  );
}
