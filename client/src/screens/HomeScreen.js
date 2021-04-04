import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Products from "../components/Product";
import { listProducts } from "../actions/productAction"; /* using redux action reducer*/
import { useDispatch, useSelector } from "react-redux";
// import React, { useState, useEffect } from "react"; /* use for local state control */
// import axios from "axios"; /* use for local state control */
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
	// /*========================================================================|
	// 	useState for component local state control, state and action needs to
	// 	pass in level by level...
	// ------------------------------------------------------------------------*/
	// //gonna be an empty array if there's no product return
	// const [products, setProducts] = useState([]);

	// //This will load whenever this component is loaded
	// useEffect(
	// 	() => {
	// 		//get the request from api Get call. however, use await instead..
	// 		//axios.get('/api/products').then(res)

	// 		const fetchProducts = async () => {
	// 			//const res = await axios.get("/api/products");
	// 			//data object will assgin to (res) where we can deconstruct it like this same as calling res.data:
	// 			const { data } = await axios.get("/api/products");

	// 			//update the products state from the data we got from server api call
	// 			setProducts(data);
	// 		};

	// 		//call the fetch function
	// 		fetchProducts();
	// 	},
	// 	[] /*this holds the dependency for anything I want to fire off the useEffect on state changes*/
	// );
	/*========================================================================|
		Using redux reducer and action, passing compoent state and action 
		in a global scale, no need to passing props in every instants.
	------------------------------------------------------------------------*/
	const dispatch = useDispatch();
	const productList = useSelector((state) => {
		return state.productList;
	}); // from store.js a reducer
	const { loading, error, products } = productList; // destructure productListReducer return value

	useEffect(() => {
		dispatch(listProducts());
	}, [
		dispatch,
	]); /* since dispatch was used just add it as dependency to get rid of the warnings*/

	return (
		<>
			<h1>Every Things Fluffly</h1>
			{/* if loading is true, render the spilting, otherwise render product home screen*/}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{products.map((eachProduct) => (
						<Col key={eachProduct._id} sm={12} md={6} lg={4} x1={3}>
							<Products productProps={eachProduct} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
