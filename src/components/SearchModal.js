import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { closeSearch } from "../features/navbar/searchSlice";
import { sortByRelevance } from "../features/products/filterSlice";
import DropDownSearchBar from "./DropDownSearchBar";

export default function SearchModal() {
  const dispatch = useDispatch();
  const { sortedProducts } = useSelector((state) => state.filter);
  const [keyword, setKeyword] = useState("");

  const onInputChange = (e) => {
    // setKeyword(e.target.value);
    e.preventDefault();
    dispatch(sortByRelevance(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Wrapper className="center-items">
      <GrClose
        size={60}
        className="close-icon"
        color="white"
        onClick={() => dispatch(closeSearch())}
      />
      <Form onSubmit={handleSubmit}>
        <DropDownSearchBar
          productOptions={sortedProducts.slice(0, 3)}
          onInputChange={onInputChange}
          closeSearch={closeSearch}
        />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  z-index: 10000;
  width: 100vw;
  height: 50vh;
  position: absolute;
  background-color: rgba(120, 120, 120, 0.64);

  .close-icon {
    position: absolute;
    top: 10vh;
    right: 15vw;
  }

  .close-icon:hover {
    cursor: pointer;
  }
  .searchBox {
    width: 40vw;
    height: 5vh;
  }
`;
