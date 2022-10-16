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
    dispatch(sortByRelevance(e.target.value));
  };

  // useEffect(() => {
  //   console.log(keyword);
  //   dispatch(sortByRelevance(keyword));
  // }, [keyword]);

  return (
    <Wrapper className="center-items">
      <GrClose
        size={60}
        className="close-icon"
        color="white"
        onClick={() => dispatch(closeSearch())}
      />
      <Form onSubmit={() => console.log("submit")}>
        <DropDownSearchBar
          productOptions={sortedProducts}
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
  height: 100vh;
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
