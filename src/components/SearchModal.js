import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { Typeahead } from "react-bootstrap-typeahead";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { closeSearch } from "../features/navbar/searchSlice";

export default function SearchModal() {
  const dispatch = useDispatch();
  const options = ["dsad", "dsadsa", "dsadsa"];
  const [singleSelections, setSingleSelections] = useState([]);
  return (
    <Wrapper className="center-items">
      <GrClose
        size={60}
        className="close-icon"
        color="white"
        onClick={() => dispatch(closeSearch())}
      />
      <Typeahead
        className="searchBox mx-4"
        id="basic-typeahead-single"
        labelKey="name"
        onChange={setSingleSelections}
        options={options}
        placeholder="Search..."
        selected={singleSelections}
      />
      <Button>
        <BiSearch size={25} />
      </Button>
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
