import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

export default function Cart() {
  const { isSignIn } = useSelector((state) => state.auth);

  if (!isSignIn) {
    return <Login />;
  }

  return <div>Cart</div>;
}
