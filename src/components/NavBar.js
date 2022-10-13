import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Dropdown,
  Form,
} from "react-bootstrap";
import { openSearch } from "../features/navbar/searchSlice";
import { signIn } from "../features/userAuth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import { BiHeart } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

export default function NavBar() {
  const dispatch = useDispatch();
  const { isSignIn } = useSelector((state) => state.auth);

  // for testing only, will change this when connect to back-end API
  const brands = ["Apple", "Samsung", "Google", "Nokia", "Oppo", "Sony"];

  // boostrap Nav bar doc: https://react-bootstrap.github.io/components/navbar/
  return (
    <Navbar
      className="navbar-expand-md py-4 shadow-sm nav-bar"
      id="nav-bar"
      bg="light"
      expand="xxl"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" width={"60px"} height={"60px"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <NavDropdown title="Brands" id="navbarScrollingDropdown">
              {brands.map((brand, idx) => {
                return (
                  <Dropdown.Item as={Link} to={`/brands/${brand}`} key={idx}>
                    {brand}
                  </Dropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <Form className="d-flex me-5 w-20">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-3 search-form-input"
              aria-label="Search"
              onMouseDown={() => dispatch(openSearch())}
            />
          </Form>
          <Nav>
            {isSignIn && (
              <>
                <Nav.Link as={Link} to="/wishlist">
                  <BiHeart size={25} />
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <AiOutlineShoppingCart size={25} />
                </Nav.Link>
                <Nav.Link as={Link} to="/userprofile">
                  <BsPersonCircle size={25} />
                </Nav.Link>
              </>
            )}

            {!isSignIn && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
