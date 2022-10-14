import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import { testProductData } from "../util/constants";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const filterItems = [
    "Price: low - high",
    "Price: high - low",
    "Rating: low - high",
    "Rating: high - low",
    "Relevance",
  ];
  const [selectedFilterItem, setSelectedFilterItem] = useState(filterItems[0]);

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
        <Dropdown.Menu variant="dark">
          {filterItems.map((item, idx) => {
            return (
              <Dropdown.Item
                key={idx}
                onClick={() => setSelectedFilterItem(item)}
              >
                {item}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <hr />
      <div className="products">
        {testProductData.map((product, idx) => (
          <ProductCard
            key={idx}
            name={product.name}
            imgUrl={product.imgUrl}
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
