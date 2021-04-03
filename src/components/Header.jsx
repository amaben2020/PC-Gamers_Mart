import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "./../actions/userActions";
import Searchbox from "./Searchbox";
import { Route } from "react-router";
const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);

	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};
	return (
		<header className="shadow-lg mb-3">
			<Navbar bg="light" variant="light" collapseOnSelect expand="lg">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							PC Gamer's Mart <i className="fas fa-shopping-cart"></i>
							<i class="fas fa-gamepad"></i>
							<h6
								style={{ fontSize: 6.4, fontStyle: "italic", fontWeight: 900 }}
							>
								Bringing awesomeness to your doorstep
							</h6>
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Route render={({ history }) => <Searchbox history={history} />} />

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

							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin" id="adminmenu">
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item href="#action/3.1">
											Users
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item href="#action/3.1">
											Products
										</NavDropdown.Item>
									</LinkContainer>

									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item href="#action/3.1">
											Orders
										</NavDropdown.Item>
									</LinkContainer>

									<NavDropdown.Divider />
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
