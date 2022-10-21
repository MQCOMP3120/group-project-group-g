import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

export default function WishList() {
  const { isSignIn } = useSelector((state) => state.auth);

  if (!isSignIn) {
    return <Login />;
  }

  return <div>WishList</div>;
}
