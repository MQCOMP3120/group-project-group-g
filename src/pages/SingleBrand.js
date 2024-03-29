import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  sortByBrand,
  singleBrandSortByPriceHighLow,
  singleBrandSortByPriceLowHigh,
  singleBrandSortByRatingHighLow,
  singleBrandSortByRatingLowHigh,
} from "../features/products/filterSlice";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

export default function SingleBrand() {
  const { brandId } = useParams();
  const dispatch = useDispatch();
  const { singleBrandProducts, brands, isLoading } = useSelector(
    (state) => state.filter
  );

  const currentBrand = brands.filter((brand) => brand.id === brandId)[0];
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const filterItems = [
    "Price: Low - High",
    "Price: High - Low",
    "Rating: Low - High",
    "Rating: High - Low",
  ];

  const [selectedFilterItem, setSelectedFilterItem] = useState(filterItems[0]);

  const filterProducts = (item) => {
    setSelectedFilterItem(item);

    switch (item) {
      case "Price: Low - High":
        dispatch(singleBrandSortByPriceLowHigh());
        break;
      case "Price: High - Low":
        dispatch(singleBrandSortByPriceHighLow());
        break;
      case "Rating: Low - High":
        dispatch(singleBrandSortByRatingLowHigh());
        break;
      case "Rating: High - Low":
        dispatch(singleBrandSortByRatingHighLow());
    }
  };

  useEffect(() => {
    dispatch(sortByBrand(brandId));
  }, [brandId, currentBrand]);

  if (isLoading || currentBrand === undefined) {
    return <Loading />;
  }

  const idxOfLastProduct = currentPage * productsPerPage;
  const idxOfFirstProduct = idxOfLastProduct - productsPerPage;
  const currentProducts = singleBrandProducts.slice(
    idxOfFirstProduct,
    idxOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Wrapper className="section-center">
      <Breadcrumb className="my-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active> {currentBrand.title} </Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="text"> {currentBrand.title} </h3>
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
            description={product.description}
          />
        ))}
      </div>
      <Pagination
        productsPerpage={productsPerPage}
        totalProducts={singleBrandProducts.length}
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
