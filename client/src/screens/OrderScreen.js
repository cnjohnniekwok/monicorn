import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Card, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
	getOrderDetails,
	payOrder,
	listMyOrders,
} from "../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);

	// just renaming the orderPay state
	const { loading: loadingPay, success: successPay } = orderPay;

	//keep a state for PayPal SDK to load
	const [paypalSDKready, setPaypalSDKready] = useState(false);

	useEffect(() => {
		//Dynamically adding the paypay SDK while use
		//-----------------------------------------------------------------------|
		const addPayPalScript = async () => {
			//fetch paypal client ID
			const { data: clientId } = await axios.get("/api/config/paypal");
			//console.log(clientId);
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true;

			//reference: https://developer.paypal.com/docs/checkout/reference/customize-sdk/
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

			//change state while paypal SDK done loading.
			script.onload = () => {
				setPaypalSDKready(true);
			};
			document.body.appendChild(script);
		};
		//-----------------------------------------------------------------------|

		if (!order || successPay || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET }); //reset the payment state to aviod infinite loop of refresh
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			//if order is not paid,
			if (!window.paypal) {
				// if there's no paypal script ready
				addPayPalScript(); // call the add paypal sdk function
			} else {
				// if paypal script is ready
				setPaypalSDKready(true);
			}
		}
	}, [dispatch, orderId, order, successPay]);

	const successPaymentHandler = (paymentResult) => {
		//console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
		dispatch(listMyOrders()); //backgroud update profile order list
	};
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<Card className="rounded product-holder">
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Order Number:</strong> {order._id} <br />
									<strong>Name: </strong> {order.user.name} <br />
									<strong>Email: </strong>
									<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
									<br />
									<strong>Address: </strong>
									{`${order.shippingAddress.address}, ${order.shippingAddress.city}, 
								${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
								</p>
								{order.isDelivered ? (
									<Message variant="success">
										Delivered on {order.isDelivered}
									</Message>
								) : (
									<Message variant="primary">Not Delivered</Message>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Payment Method</h2>
								<p>
									<strong>Method: </strong>
									{order.paymentMethod}
								</p>
								{order.isPaid ? (
									<Message variant="success">Paid on {order.paidAt}</Message>
								) : (
									<Message variant="primary">Not Paid</Message>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Order Items</h2>
								{order.orderItems.length === 0 ? (
									<Message>Order is empty</Message>
								) : (
									<ListGroup variant="flush">
										{order.orderItems.map((item, index) => (
											<ListGroup.Item key={index}>
												<Row>
													<Col md={1}>
														<Image
															src={item.image}
															alt={item.name}
															fluid
															rounded
														/>
													</Col>
													<Col>
														<Link to={`/product/${item.product}`}>
															{item.name}
														</Link>
													</Col>
													<Col md={4}>
														{item.qty} x £{item.price} = £
														{item.qty * item.price}
													</Col>
												</Row>
											</ListGroup.Item>
										))}
									</ListGroup>
								)}
							</ListGroup.Item>
						</Card>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card className="rounded product-holder">
						<ListGroup>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>£{order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>£{order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>VAT</Col>
									<Col>£{order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>£{order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!paypalSDKready ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										></PayPalButton>
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
