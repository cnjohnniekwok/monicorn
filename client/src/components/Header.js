import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					{/*Brand Title*/}
					<LinkContainer to="/">
						<Navbar.Brand>MoNicorn</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					{/*Navigation Link *Always Showing* */}
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								{/* so it can route without refreshing the page using herf*/}

								<Nav.Link>
									{/* Each Link */}
									<i className="fas fa-shopping-cart"></i> Cart
								</Nav.Link>
							</LinkContainer>

							<LinkContainer to="/login">
								<Nav.Link>
									{/* Each Link */}
									<i className="fas fa-user"></i> Sign In
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
