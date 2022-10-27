import { Form } from "react-bootstrap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";
import {
  signIn,
  setUser,
  authUser,
  usernameOnChange,
  passwordOnChange,
} from "../features/userAuth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn, user } = useSelector((state) => state.auth);

  // dispatch(regUser());
  useEffect(() => {
    if (isSignIn) {
      return navigate("/");
    }
  }, [isSignIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authUser());
    dispatch(signIn());
    console.log(user);
  };

  return (
    <Wrapper className="center-items section-center">
      <Form noValidate validated={isSignIn} onSubmit={handleSubmit}>
        <Form.Group className="d-flex justify-content-between">
          <h2 className="welcome-text"> Welcome </h2>
          <Link to="/register">
            <p className="register-btn">
              Register
              <AiOutlineRight />
            </p>
          </Link>
        </Form.Group>
        <Form.Group className="mb-3">
          <p>Login to continue</p>

          <Form.FloatingLabel controlId="usernameInput" label="Username">
            <Form.Control
              type="username"
              placeholder="Username"
              onChange={(e) => dispatch(usernameOnChange(e.target.value))}
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
        <Form.Group>
          <p className="register-btn">Forgot your password?</p>
          <button type="submit" className="login-button">
            Submit
          </button>
        </Form.Group>
        <p className="break-line">
          <span> or </span>
        </p>
        <Form.Group className="d-flex justify-content-center">
          <GoogleLogin
            onSuccess={(res) => {
              const { name, email } = jwtDecode(res.credential);
              const username = name;
              dispatch(setUser({ username, email }));
              dispatch(signIn());
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
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

  .login-button {
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
  .break-line span {
    background: #fff;
    padding: 0 10px;
  }
`;
