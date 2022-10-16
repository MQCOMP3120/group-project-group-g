import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSearch } from "../features/navbar/searchSlice";

export default function DropDownSearchBar({ productOptions, onInputChange }) {
  const dispatch = useDispatch();
  return (
    <Form className="search-bar-dropdown d-flex">
      <Form.Group>
        <input
          autoFocus
          type="text"
          className="form-control"
          placeholder="Search product"
          onChange={onInputChange}
        />

        <ul className="list-group">
          {productOptions.map((productOption) => {
            return (
              <Button
                key={productOption.id}
                type="button"
                className="list-group-item list-group-item-action"
                as={Link}
                to={`/products/${productOption.id}`}
                onClick={() => dispatch(closeSearch())}
              >
                {productOption.title}
              </Button>
            );
          })}
        </ul>
      </Form.Group>
    </Form>
  );
}
