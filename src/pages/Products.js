import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Breadcrumb, Dropdown } from "react-bootstrap";
// import { testProductData } from "../util/constants";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import {
  sortByPriceLowHigh,
  sortByPriceHighLow,
  sortByRatingHighLow,
  sortByRatingLowHigh,
  resetProducts,
  resetKeyword,
} from "../features/products/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { setHideNavBarFalse } from "../features/navbar/searchSlice";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

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
        break;
      case "All Products":
        dispatch(resetProducts());
        dispatch(resetKeyword());
    }
  };

  useEffect(() => {
    dispatch(setHideNavBarFalse());
  }, []);

  if (isLoading) {
    return <h1> Loading ... </h1>;
  }

  const idxOfLastProduct = currentPage * productsPerPage;
  const idxOfFirstProduct = idxOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    idxOfFirstProduct,
    idxOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log(currentProducts, idxOfFirstProduct, idxOfLastProduct);

  return (
    <Wrapper className="section-center">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active> Products </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="text">
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
        {currentProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            name={product.title}
            imgUrl={product.image}
            price={product.price}
            rating={product.rating.toFixed(1)}
            id={product.id}
          />
        ))}
      </div>
      <Pagination
        productsPerpage={productsPerPage}
        totalProducts={sortedProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .text {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
  }
  .products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem 1.5rem;
    margin: 4rem auto;
  }
`;
