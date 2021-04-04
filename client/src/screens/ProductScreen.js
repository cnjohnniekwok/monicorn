import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listProductDetails } from "../actions/productAction"; /* using redux action reducer*/
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = (props) => {
	const [qty, setQty] = useState(1); //component scope state, set qty to only allow use select up to N items to purchase, its 1 because when user adding item into cart, there's aleast one of the item selected.

	//gonna be an empty array if there's no product return
	//const [product, setProduct] = useState({});

	// useEffect(() => {
	// 	const fetchProduct = async () => {
	// 		const { data } = await axios.get(
	// 			//when using "`" no need to use qoutes '"'
	// 			`/api/products/${props.match.params.id}`
	// 		);
	// 		setProduct(data);
	// 	};

	// 	fetchProduct();
	// }, [props.match.params.id]);

	// // fake product data from product.js JSON.
	// const product = products.find(
	// 	//props.match has params for URL/:id <-- like express req.body.params.id
	// 	(product) => product._id === props.match.params.id
	// );

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => {
		return state.productDetails;
	}); // from store.js a reducer
	const { loading, error, product } = productDetails; // destructure productListReducer return value

	useEffect(() => {
		dispatch(listProductDetails(props.match.params.id));
	}, [
		dispatch,
		props,
	]); /* since dispatch and match was used just add it as dependency to get rid of the warnings*/

	const addToCartHandler = () => {
		props.history.push(`/cart/${props.match.params.id}?qty=${qty}`); //redirecting to cart route, with user selected qty as url params.
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Card className="my-3 p-3 rounded product-holder">
					<Row>
						<Col md={6}>
							{/* Use fluid to keep image inside of the container */}
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: £{product.price}</ListGroup.Item>
								<ListGroup.Item>
									Discription: {product.description}
								</ListGroup.Item>
							</ListGroup>
							<Link className="btn btn-block btn-secondary my-3" to="/">
								Return to home
							</Link>
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>£{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Stocks:</Col>
										<Col>
											{`${
												product.countInStock > 0 ? "In Stock" : "Out of Stock"
											}`}
										</Col>
									</Row>
								</ListGroup.Item>
								{/* set qty for user to select up to number of in stock items*/}
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty /* let user choose up to qty in stock */}
													onChange={(event) => {
														console.log(event.target.value);
														return setQty(event.target.value);
													}}
												>
													{
														/* want to have somthing like [1,2,3, ... , N] for users to choose from*/
														[...Array(product.countInStock).keys()].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option> /*x starts with 0*/
														))
													}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									{/* set disable to True if product count is 0 */}
									<Button
										onClick={addToCartHandler}
										className="btn-block btn-primary"
										type="button"
										disabled={product.countInStock === 0}
									>
										Add To CART
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</Card>
			)}
		</>
	);
};

export default ProductScreen;
