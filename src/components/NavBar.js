import { Link } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar, Dropdown } from "react-bootstrap";
import { openSearch } from "../features/navbar/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import { BiHeart, BiSearch } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import CartButton from "./CartButton";

export default function NavBar() {
  const dispatch = useDispatch();
  const { isSignIn } = useSelector((state) => state.auth);
  const { brands } = useSelector((state) => state.filter);
  const { hideNavBar } = useSelector((state) => state.search);

  // boostrap Nav bar doc: https://react-bootstrap.github.io/components/navbar/
  return (
    <Navbar
      className="py-4"
      id={hideNavBar ? "nav-bar-hide" : "nav-bar"}
      variant="dark"
      bg="dark"
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
              {brands.map((brand) => {
                return (
                  <Dropdown.Item
                    as={Link}
                    to={`/brands/${brand.id}`}
                    key={brand.id}
                  >
                    {brand.title}
                  </Dropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>
              <BiSearch size={25} onClick={() => dispatch(openSearch())} />
            </Nav.Link>
            {isSignIn && (
              <>
                <Nav.Link as={Link} to="/wishlist">
                  <BiHeart size={25} />
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  <CartButton />
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
