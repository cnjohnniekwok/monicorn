import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ history, location }) => {
	//to capture input and update state -: local state
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	//declare global state (holder)
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	//if user already login, redirect user to
	useEffect(
		() => {
			if (userInfo) {
				//if check userInfo has info, which mean use has already login.
				history.push(redirect); // will go to whatever in redirect.
			}
		},
		[
			history,
			userInfo,
			redirect,
		] /* dont forgot to list all the dependency... whatever used here */
	);

	const submitHandler = (event) => {
		event.preventDefault(); //so it wont refresh!

		//this login userAction will pass in email and password, and it will either propagate 'userLogin' with (loading, userInfo) or (loading with error)
		dispatch(login(email, password)); //brought in from userAction
	};
	return (
		<FormContainer>
			<h1>Sign In</h1>

			{error /* state will update once dispatch login is called */ && (
				<Message variant="danger">{error}</Message>
			)}

			{loading && <Loader /> /* if the page is loading, then show the loader */}

			<Form onSubmit={submitHandler}>
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

				<Button type="submit" variant="primary">
					Sign In
				</Button>
				<Row className="py-3">
					<Col>
						New Customer?{" "}
						<Link
							to={redirect ? `/register?redirect=${redirect}` : "/register"}
						>
							Register
						</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default LoginScreen;
