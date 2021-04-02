import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Products from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
	//gonna be an empty array if there's no product return
	const [products, setProducts] = useState([]);

	//This will load whenever this component is loaded
	useEffect(
		() => {
			//get the request from api Get call. however, use await instead..
			//axios.get('/api/products').then(res)

			const fetchProducts = async () => {
				//const res = await axios.get("/api/products");
				//data object will assgin to (res) where we can deconstruct it like this same as calling res.data:
				const { data } = await axios.get("/api/products");

				//update the products state from the data we got from server api call
				setProducts(data);
			};

			//call the fetch function
			fetchProducts();
		},
		[] /*this holds the dependency for anything I want to fire off the useEffect on state changes*/
	);

	return (
		<>
			<h1>Every Things Fluffly</h1>
			<Row>
				{products.map((eachProduct) => (
					<Col key={eachProduct._id} sm={12} md={6} lg={4} x1={3}>
						<Products productProps={eachProduct} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
