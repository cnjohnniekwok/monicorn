import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Meta from "../components/Meta";

//<location>?qty = location.search.qty <-- get query string and <history> is use for redriect.
const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1; //location.search returns ?qty=1
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkOutHandler = () => {
		//if not login, goes to login, otherwise, redirect to shipping
		history.push("/login?redirect=shipping");
	};

	return (
		<>
			<h1>Shopping Cart</h1>
			<Meta title="My Cart" />
			<Row>
				<Col md={8}>
					{cartItems.length === 0 ? (
						<Message>
							You cart is empty <Link to="/">Return Home</Link>
						</Message>
					) : (
						<Card className="rounded product-holder">
							<ListGroup variant="flush">
								{cartItems.map((eachItem) => (
									<ListGroup.Item key={eachItem.product}>
										<Row>
											<Col md={2}>
												<Image
													src={eachItem.image}
													alt={eachItem.name}
													fluid
													rounded
												></Image>
											</Col>
											<Col md={3}>
												<Link to={`/product/${eachItem.product}`}>
													{eachItem.name}
												</Link>
											</Col>
											<Col md={2}>£{eachItem.price}</Col>
											<Col md={2}>
												<Form.Control
													as="select"
													value={
														eachItem.qty /* let user update their cart item qty */
													}
													onChange={(event) => {
														/*since there's no setQty in this local screen, just call addToCart instead,
												and addToCart is an action, need to call dispatch for it*/
														dispatch(
															addToCart(
																eachItem.product,
																Number(event.target.value)
															)
														);
													}}
												>
													{
														/* want to have somthing like [1,2,3, ... , N] for users to choose from*/
														[...Array(eachItem.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option> /*x starts with 0*/
															)
														)
													}
												</Form.Control>
											</Col>
											<Col md={2}>
												<Button
													type="button"
													variant="light"
													onClick={() =>
														removeFromCartHandler(eachItem.product)
													}
												>
													<i className="fas fa-trash"></i>
												</Button>
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card>
					)}
				</Col>
				<Col md={4}>
					<Card className="rounded product-holder">
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>
									Subtotal (
									{
										/* get the sum of the numbers of total item, javaScript reduce with
									accumulator and the each item qty count and starting from 0	*/
										cartItems.reduce((acc, eachItem) => acc + eachItem.qty, 0)
									}
									) items
								</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								£
								{
									cartItems
										.reduce(
											(acc, eachItem) => acc + eachItem.price * eachItem.qty,
											0
										)
										.toFixed(2) /* two decimal Point */
								}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems.length === 0}
									onClick={checkOutHandler}
								>
									Proceed To Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CartScreen;
