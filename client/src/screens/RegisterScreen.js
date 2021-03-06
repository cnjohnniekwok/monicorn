import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";

const RegisterScreen = ({ history, location }) => {
	//to capture input and update state -: local state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	//declare global state (holder)
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

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
		if (password !== confirmPassword) {
			setMessage("Password do not match.");
		} else {
			dispatch(register(name, email, password));
		}
	};
	return (
		<FormContainer>
			<ListGroup>
				<Card className="my-3 p-3 rounded product-holder">
					<h1>Sign Up</h1>
					{message && <Message variant="danger">{message}</Message>}
					{error && <Message variant="danger">{error}</Message>}
					{loading && <Loader />}
					<Meta title="Register" />
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
							Register
						</Button>
						<Row className="py-3">
							<Col>
								Have an Account?{" "}
								<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
									Login
								</Link>
							</Col>
						</Row>
					</Form>
				</Card>
			</ListGroup>
		</FormContainer>
	);
};

export default RegisterScreen;
