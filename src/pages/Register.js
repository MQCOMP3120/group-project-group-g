import { Form } from "react-bootstrap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
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
        <Form.Group className="d-flex justify-content-between">
          <h2 className="welcome-text"> Welcome </h2>
          <Link to="/login">
            <p className="register-btn">
              Login
              <AiOutlineRight />
            </p>
          </Link>
        </Form.Group>
        <Form.Group className="mb-3">
          <p>Register an account</p>
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
        <Form.Group className="mb-4">
          <Form.FloatingLabel controlId="passwordInput" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => dispatch(passwordOnChange(e.target.value))}
            />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group className="d-grid">
          <Link to="/login">
            <p className="login-btn">Already have an account?</p>
          </Link>
          <button type="submit" className="register-button">
            Submit
          </button>
        </Form.Group>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  form {
    height: 60vh;
    min-width: 30vw;
    padding: 2rem;
  }
  .welcome-text {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 900;
    font-size: 30px;
  }
  .login-btn {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
  .login-btn:hover {
    color: #0275d8;
  }

  .register-button {
    padding: 14px 28px;
    gap: 10px;
    width: 456px;
    height: 44px;
    background: #444444;
    border-radius: 6px;

    font-family: "Poppins";
    font-style: normal;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
  .register-btn {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
  .register-btn:hover {
    color: #0275d8;
  }
  .break-line {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid #787672;
    line-height: 0.1em;
    margin: 20px 0 20px;
  }
`;
