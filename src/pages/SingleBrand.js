import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  sortByBrand,
  sortByPriceHighLow,
  sortByPriceLowHigh,
  sortByRatingHighLow,
  sortByRatingLowHigh,
} from "../features/products/filterSlice";
import ProductCard from "../components/ProductCard";
import ErrorPage from "./ErrorPage";

export default function SingleBrand() {
  const { brandId } = useParams();
  const dispatch = useDispatch();
  const { singleBrandProducts, brands, isLoading } = useSelector(
    (state) => state.filter
  );

  const currentBrand = brands.filter((brand) => brand.id === brandId)[0];

  const filterItems = [
    "Relevance",
    "Price: low - high",
    "Price: high - low",
    "Rating: low - high",
    "Rating: high - low",
  ];

  const [selectedFilterItem, setSelectedFilterItem] = useState(filterItems[0]);

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
    }
  };

  useEffect(() => {
    dispatch(sortByBrand(brandId));
  }, [brandId, currentBrand]);

  if (isLoading || currentBrand === undefined) {
    return <h1> Loading ....</h1>;
  }

  return (
    <Wrapper className="section-center">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active> {currentBrand.title} </Breadcrumb.Item>
      </Breadcrumb>
      <h3> {currentBrand.title} </h3>
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
        {singleBrandProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            name={product.tittle}
            imgUrl={product.image}
            price={product.price}
            rating={product.rating}
            id={product.id}
            description={product.description}
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