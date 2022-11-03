import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="section-center center-items d-flex flex-lg-column">
      <h1 className="mb-5"> 404 Page Not Found </h1>
      <Link to={"/"}> Back to home </Link>
    </section>
  );
}
