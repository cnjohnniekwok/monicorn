import React, { useState, useEffect } from "react";
import { Card, Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders, deleteOrder } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import Meta from "../components/Meta";
const ProfileScreen = ({ history, location }) => {
	//to capture input and update state -: local state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	//declare global state (holder)
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	//bring this in to check if user has already login
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//get successful state from user update profile
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { successUpdate } = userUpdateProfile;

	//declare global state (holder)
	const orderMyOrders = useSelector((state) => state.orderMyOrders);
	const { loading: loadingOrders, error: errorOrders, orders } = orderMyOrders;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { loading: loadingDel, success: successDel } = orderDelete;

	useEffect(
		() => {
			if (userInfo) {
				if (!user.name || successUpdate || successDel) {
					dispatch({ type: USER_UPDATE_PROFILE_RESET });
					dispatch({ type: ORDER_DELETE_RESET });
					dispatch(getUserDetails("profile")); //this will hit the route /api/user/profile instead!
					dispatch(listMyOrders()); //just need to call the function @ action in useEffect, state will update in orderMyOrders
				} else {
					//set the form field for user's info
					setName(user.name);
					setEmail(user.email);
				}
			} else {
				//if no userInfo
				history.push("/login"); // redirect to login screen.
			}
		},
		[
			dispatch,
			history,
			userInfo,
			user,
			orders,
			successUpdate,
			successDel,
		] /* dont forgot to list all the dependency when using useEffect... whatever used here */
	);

	const submitHandler = (event) => {
		event.preventDefault(); //so it wont refresh!
		if (password !== confirmPassword) {
			setMessage("Password do not match."); //check confrim password is correct
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	const deleteHandler = (order) => {
		//onClick actions goes here
		if (window.confirm(`Are you sure to remove order ID (${order._id})?`)) {
			dispatch(deleteOrder(order));
		}
	};
	return (
		<Row>
			<Col md={3}>
				<Card className="my-3 p-3 rounded product-holder">
					<h2>User Profile</h2>
					{message && <Message variant="danger">{message}</Message>}
					{error && <Message variant="danger">{error}</Message>}
					{successUpdate && (
						<Message variant="success">Profile Updated</Message>
					)}
					{loading && <Loader />}
					<Meta title={user.name} />
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter Name"
								value={name}
								onChange={(event) => {
									return setName(event.target.value);
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter Email"
								value={email}
								onChange={(event) => {
									return setEmail(event.target.value);
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								value={password}
								onChange={(event) => {
									return setPassword(event.target.value);
								}}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="confirmPassword">
							<Form.Label>Confrim Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(event) => {
									return setConfirmPassword(event.target.value);
								}}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update Profile
						</Button>
					</Form>
				</Card>
			</Col>

			<Col md={9}>
				<Card className="my-3 p-3 rounded product-holder">
					<h2>My Orders</h2>
					{loadingOrders ? (
						<Loader />
					) : errorOrders ? (
						<Message variant="danger">{errorOrders}</Message>
					) : (
						<Table striped bordered hover responsive className="table-sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th>ACTION</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												></i>
											)}
										</td>
										<td>
											<LinkContainer to={`/order/${order._id}`}>
												<Button className="btn-sm" variant="light">
													Details
												</Button>
											</LinkContainer>
											{!order.isPaid && (
												<Button
													variant="primary"
													className="btn-sm ml-2"
													onClick={() => deleteHandler(order)}
												>
													<i className="fas fa-trash"></i>
													{loadingDel && <Loader />}
												</Button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Card>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
