import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col className="text-center py-3">
						This is site is build for Demo purpose only, the product aren't for
						sell, and you will not receive any shipment from this demo store.
					</Col>
				</Row>
				<Row>
					<Col className="text-center copyright">
						Copyright &copy; {new Date().getFullYear()} Johnnie Kwok@MoNicorn
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
