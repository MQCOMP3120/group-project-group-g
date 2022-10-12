import { Form } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

export default function Register() {
  return (
    <Wrapper className="center-items section-center">
      <Form>
        <Form.Group className="mb-2 d-flex justify-content-between">
          <Link to="/login" className="p-3">
            <p className="login-btn">
              <AiOutlineLeft />
              Login
            </p>
          </Link>
          <h3 className="current-page p-3"> Register </h3>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.FloatingLabel controlId="emailInput" label="Email Address">
            <Form.Control type="email" placeholder="Email Address" />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.FloatingLabel controlId="passwordInput" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form.Group>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  form {
    height: 50vh;
    min-width: 30vw;
    padding: 2rem;
    border-radius: 15px;
    border: 1px solid #787672;
  }
  .login-btn:hover {
    color: #0275d8;
  }
`;
