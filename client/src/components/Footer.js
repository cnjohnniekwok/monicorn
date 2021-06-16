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
						<section className="mb-4">
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="mailto:cnjohnniekwok@gmail.com"
								role="button"
							>
								<i className="fab fa-google"></i>
							</a>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://www.linkedin.com/in/johnniekwok/"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i className="fab fa-linkedin-in"></i>
							</a>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://github.com/cnjohnniekwok/monicorn"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i className="fab fa-github"></i>
							</a>
						</section>
						Copyright &copy; {new Date().getFullYear()} Johnnie Kwok@MoNicorn
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
