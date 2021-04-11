import React from "react";

//if need to call global action use dispatch, get global state use selector
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import { Route } from "react-router-dom";
import SearchBar from "../components/SearchBox";

const Header = () => {
	//check for useInfo
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					{/*Brand Title*/}
					<LinkContainer to="/">
						<Navbar.Brand>All Things Fluffy</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					{/*Navigation Link *Always Showing* */}
					<Navbar.Collapse id="basic-navbar-nav">
						{/*use Router-dom to pass props.history to SearchBar for history.push */}
						<Route render={({ history }) => <SearchBar history={history} />} />
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								{/* so it can route without refreshing the page using herf*/}

								<Nav.Link>
									{/* Each Link */}
									<i className="fas fa-shopping-cart"></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										{/* Each Link */}
										<i className="fas fa-user"></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin Console" id="adminmenu">
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>Manage Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>Manage Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Manage Orders</NavDropdown.Item>
									</LinkContainer>
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
