import { Form } from "react-bootstrap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import Home from "./Home";
import {
  regUser,
  usernameOnChange,
  passwordOnChange,
  emailOnChange,
} from "../features/userAuth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn, user } = useSelector((state) => state.auth);

  console.log(user);
  useEffect(() => {
    if (isSignIn) {
      return navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(signIn());
    dispatch(regUser());
  };

  return (
    <Wrapper className="center-items section-center">
      <Form onSubmit={handleSubmit}>
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
          <Form.FloatingLabel controlId="usernameInput" label="Username">
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={(e) => dispatch(usernameOnChange(e.target.value))}
            />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.FloatingLabel controlId="emailInput" label="Email Address">
            <Form.Control
              type="email"
              placeholder="Email Address"
              onChange={(e) => dispatch(emailOnChange(e.target.value))}
            />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.FloatingLabel controlId="passwordInput" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => dispatch(passwordOnChange(e.target.value))}
            />
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
