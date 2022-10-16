import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Breadcrumb, Dropdown } from "react-bootstrap";
// import { testProductData } from "../util/constants";
import ProductCard from "../components/ProductCard";
import {
  sortByPriceLowHigh,
  sortByPriceHighLow,
  sortByRatingHighLow,
  sortByRatingLowHigh,
  resetProducts,
} from "../features/products/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const filterItems = [
    "Relevance",
    "All Products",
    "Price: low - high",
    "Price: high - low",
    "Rating: low - high",
    "Rating: high - low",
  ];

  const [selectedFilterItem, setSelectedFilterItem] = useState(filterItems[0]);

  const { sortedProducts, isLoading } = useSelector((state) => state.filter);

  const filterProducts = (item) => {
    setSelectedFilterItem(item);

    switch (item) {
      case "Price: low - high":
        dispatch(sortByPriceLowHigh());
        break;
      case "Price: high - low":
        dispatch(sortByPriceHighLow());
        break;
      case "Rating: low - high":
        dispatch(sortByRatingLowHigh());
        break;
      case "Rating: high - low":
        dispatch(sortByRatingHighLow());
      case "All Products":
        dispatch(resetProducts());
    }
  };

  if (isLoading) {
    return <h1> Loading ... </h1>;
  }

  return (
    <Wrapper className="section-center">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active> Products </Breadcrumb.Item>
      </Breadcrumb>
      <h2>All Products</h2>
      <Dropdown className="mt-5">
        <span> Sort by: </span>
        <Dropdown.Toggle variant="secondary-outline">
          {selectedFilterItem}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="light">
          {filterItems.map((item, idx) => {
            return (
              <Dropdown.Item key={idx} onClick={() => filterProducts(item)}>
                {item}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <hr />
      <div className="products">
        {sortedProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            name={product.title}
            imgUrl={product.image}
            price={product.price}
            rating={product.rating}
            id={product.id}
          />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem 1.5rem;
    margin: 4rem auto;
  }
`;
