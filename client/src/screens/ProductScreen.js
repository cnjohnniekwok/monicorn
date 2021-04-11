import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	listProductDetails,
	createProductReview,
} from "../actions/productAction"; /* using redux action reducer*/
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
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductScreen = (props) => {
	const [qty, setQty] = useState(1); //component scope state, set qty to only allow use select up to N items to purchase, its 1 because when user adding item into cart, there's aleast one of the item selected.
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
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

	const productReviewCreate = useSelector((state) => {
		return state.productReviewCreate;
	}); // from store.js a reducer
	const { error: errorReview, success: successReview } = productReviewCreate;

	const userLogin = useSelector((state) => {
		return state.userLogin;
	}); // from store.js a reducer
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successReview) {
			alert("Review Submitted");
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(props.match.params.id));
	}, [
		dispatch,
		props,
		successReview,
	]); /* since dispatch and match was used just add it as dependency to get rid of the warnings*/

	const addToCartHandler = () => {
		props.history.push(`/cart/${props.match.params.id}?qty=${qty}`); //redirecting to cart route, with user selected qty as url params.
	};

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(createProductReview(props.match.params.id, { rating, comment }));
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Card className="my-3 p-3 rounded product-holder">
					<Meta title={product.name} />
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
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Review</Message>}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
							</ListGroup>
							<ListGroup>
								<h2>Write a Customer Review</h2>
								{errorReview && (
									<Message variant="danger">{errorReview}</Message>
								)}
								{userInfo ? (
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="rating">
											<Form.Label>Rating</Form.Label>
											<Form.Control
												as="select"
												value={rating}
												onChange={(event) => {
													setRating(event.target.value);
												}}
											>
												<option value="">Select ...</option>
												<option value="1">1 - Poor</option>
												<option value="2">2 - Fair</option>
												<option value="3">3 - Good</option>
												<option value="4">4 - Very Good</option>
												<option value="5">5 - Excellent</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId="comment">
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as="textarea"
												row="3"
												value={comment}
												onChange={(event) => {
													setComment(event.target.value);
												}}
											></Form.Control>
										</Form.Group>
										<Button
											className="btn-block"
											type="submit"
											variant="primary"
										>
											Submit
										</Button>
									</Form>
								) : (
									<Message>
										Please <Link to="/login">sign in</Link>
										to write a review.{" "}
									</Message>
								)}
							</ListGroup>
						</Col>
					</Row>
				</Card>
			)}
		</>
	);
};

export default ProductScreen;
