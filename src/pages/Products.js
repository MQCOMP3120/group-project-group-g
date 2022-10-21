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
  resetKeyword,
} from "../features/products/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const filterItems = [
    "All Products",
    "Price: Low - High",
    "Price: High - Low",
    "Rating: Low - High",
    "Rating: High - Low",
  ];

  const [selectedFilterItem, setSelectedFilterItem] = useState(filterItems[0]);

  const { sortedProducts, isLoading, keyword } = useSelector(
    (state) => state.filter
  );

  const filterProducts = (item) => {
    setSelectedFilterItem(item);

    switch (item) {
      case "Price: Low - High":
        dispatch(sortByPriceLowHigh());
        break;
      case "Price: High - Low":
        dispatch(sortByPriceHighLow());
        break;
      case "Rating: Low - High":
        dispatch(sortByRatingLowHigh());
        break;
      case "Rating: High - Low":
        dispatch(sortByRatingHighLow());
      case "All Products":
        dispatch(resetProducts());
        dispatch(resetKeyword());
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
      <h2>
        {keyword === ""
          ? "All Products"
          : `${sortedProducts.length} results for "${keyword}"`}
      </h2>
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
