import { Form } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
import Home from "./Home";

export default function Login() {
  const dispatch = useDispatch();
  const { isSignIn, user } = useSelector((state) => state.auth);

  // dispatch(regUser());

  if (isSignIn) {
    return <Home />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authUser());
    dispatch(signIn());
    console.log(user);
  };

  return (
    <Wrapper className="center-items section-center">
      <Form noValidate validated={isSignIn} onSubmit={handleSubmit}>
        <Form.Group className="mb-2 d-flex justify-content-between">
          <h2 className="current-page p-3"> Login </h2>
          <Link to="/register" className="p-3">
            <p className="register-btn">
              Register
              <AiOutlineRight />
            </p>
          </Link>
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
        <Form.Group className="mb-5">
          <Form.FloatingLabel controlId="passwordInput" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => dispatch(passwordOnChange(e.target.value))}
            />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group className="d-grid mb-3">
          <button type="submit" className="btn btn-primary" id="login-btn">
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
    border-radius: 15px;
    border: 1px solid #787672;
  }

  .register-btn:hover {
    color: #0275d8;
  }
  .break-line {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid #787672;
    line-height: 0.1em;
    margin: 10px 0 20px;
  }

  .break-line span {
    background: #fff;
    padding: 0 10px;
  }
`;
