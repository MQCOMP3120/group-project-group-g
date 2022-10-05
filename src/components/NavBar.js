import { Link } from 'react-router-dom'
import { Container, Nav, NavDropdown, Navbar, Dropdown } from 'react-bootstrap'
export default function NavBar() {

    // for testing only, will change this when connect to back-end API
    const brands = ["Apple", "Samsung", "Google", "Nokia", "Oppo", "Sony"];


    // boostrap Nav bar doc: https://react-bootstrap.github.io/components/navbar/
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/"> Logo </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products">
                            Products
                        </Nav.Link>

                        <NavDropdown title="Brands" id="basic-nav-dropdown">
                            {brands.map((brand, idx) => {
                                return (
                                    <Dropdown.Item as={Link} to={`/brands/${brand}`} key={idx}>
                                        {brand}
                                    </Dropdown.Item>
                                )
                            })}
                        </NavDropdown>
                    </Nav>
                    <Nav>

                        <Nav.Link to="#search">
                            Search
                        </Nav.Link>
                        <Nav.Link eventKey={2} as={Link} to="/wishlist">Wish List</Nav.Link>
                        <Nav.Link eventKey={3} as={Link} to="/login">
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}




