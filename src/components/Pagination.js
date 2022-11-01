import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

export default function Pagination({
  productsPerpage,
  totalProducts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerpage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Wrapper>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <Button
                onClick={() => paginate(number)}
                className={
                  currentPage === number
                    ? "page-link current-page-btn"
                    : "page-link"
                }
              >
                {number}
              </Button>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .page-link {
    border-radius: 0;
  }
  .current-page-btn {
    border-bottom: 2px solid grey;
  }
`;
