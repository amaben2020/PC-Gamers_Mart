import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "./../actions/userActions";
const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);

	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};
	return (
		<header className="shadow-lg mb-3">
			<Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									{" "}
									<i className="fas fa-shopping-cart"></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo && (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							)}
							<LinkContainer to="/login">
								<Nav.Link>
									{" "}
									<i className="fas fa-user"></i> SignIn
								</Nav.Link>
							</LinkContainer>
							<NavDropdown title="About" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">
									About The App
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Upcoming Products
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">Blog</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">FAQ</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
