import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

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
	const { success } = userUpdateProfile;

	//if user already login, redirect user to
	useEffect(
		() => {
			if (!userInfo) {
				//if no userInfo
				history.push("/login"); // redirect to login screen.
			} else {
				if (!user.name || success) {
					dispatch({ type: USER_UPDATE_PROFILE_RESET });
					dispatch(getUserDetails("profile")); //this will hit the route /api/user/profile instead!
				} else {
					//set the form field for user's info
					setName(user.name);
					setEmail(user.email);
				}
			}
		},
		[
			dispatch,
			history,
			userInfo,
			user,
			success,
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
	return (
		<Row>
			<Col md={3}>
				<Card className="my-3 p-3 rounded product-holder">
					<h2>User Profile</h2>
					{message && <Message variant="danger">{message}</Message>}
					{error && <Message variant="danger">{error}</Message>}
					{success && <Message variant="success">Profile Updated</Message>}
					{loading && <Loader />}

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
					<h2>May Orders</h2>
				</Card>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
