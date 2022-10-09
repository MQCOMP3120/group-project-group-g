import { Form } from "react-bootstrap"
import styled from 'styled-components'
import { Link } from "react-router-dom"
import {AiOutlineRight} from "react-icons/ai"

export default function Login() {


    return (
        <Wrapper className="center-items section-center">
           <Form>
           <Form.Group className="mb-2 d-flex justify-content-between">
               <h3 className="current-page p-3"> Login </h3>
               <Link to="/register" className="p-3"> 
                 <p className="register-btn"> 
                   Register 
                   <AiOutlineRight />
                 </p>
                 </Link>
             </Form.Group>
              <Form.Group className="mb-3">
                <label> Email </label>
                <input type="email" className="form-control" placeholder="Enter email"/>
              </Form.Group>
              <Form.Group className="mb-5">
                <label> Password </label>
                <input type="password" className="form-control" placeholder="Enter password"/>
              </Form.Group>
              <Form.Group className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
              </Form.Group>
           </Form>
        </Wrapper>
    )
}

const Wrapper = styled.section `
height: 100vh;
form {
    height: 50vh;
    min-width: 30vw;
}

.register-btn:hover {
  color: #0275d8;

}
/* .current-page {
    background-color: lightblue;
    border-radius: 15px;
} */
`
