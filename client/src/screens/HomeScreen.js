import React from "react";
import { Row, Col } from "react-bootstrap";
import productsJS from "../products";
import Products from "../components/Product";

const HomeScreen = () => {
	return (
		<>
			<h1>Every Things Fluffly</h1>
			<Row>
				{productsJS.map((eachProduct) => (
					<Col key={eachProduct._id} sm={12} md={6} lg={4} x1={3}>
						<Products productProps={eachProduct} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
