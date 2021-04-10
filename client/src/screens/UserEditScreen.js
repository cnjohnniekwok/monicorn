import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ history, match }) => {
	const userId = match.params.id;
	//to capture input and update state -: local state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const dispatch = useDispatch();

	//declare global state (holder)
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	//if user already login, redirect user to
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push("/admin/userlist");
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, history, user, userId, successUpdate]);

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(
			updateUser({
				_id: userId,
				name,
				email,
				isAdmin,
			})
		);
	};

	return (
		<>
			<FormContainer>
				<ListGroup>
					<Card className="my-3 p-3 rounded product-holder">
						<Row>
							<Col>
								<h1>Edit User</h1>
							</Col>
							<Col className="text-right">
								<Link to="/admin/userlist/" className="btn btn-light">
									Go back
								</Link>
							</Col>
						</Row>

						{loadingUpdate && <Loader />}
						{errorUpdate && <Message variant="danger">{error}</Message>}
						{loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger">{error}</Message>
						) : (
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

								<Form.Group controlId="isAdmins">
									<Form.Check
										type="checkbox"
										label="Assign Admin Role"
										checked={isAdmin}
										onChange={(event) => {
											return setIsAdmin(event.target.checked);
										}}
									></Form.Check>
								</Form.Group>

								<Button type="submit" variant="primary">
									Update
								</Button>
							</Form>
						)}
					</Card>
				</ListGroup>
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
