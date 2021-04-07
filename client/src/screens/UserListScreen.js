import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsersProfile } from "../actions/userActions";

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	//bring this in to check if user has already login
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const deleteHandler = (useId) => {
		console.log(`Delete User: ${useId}`);
	};

	useEffect(() => {
		//this userInfo got from userLogin useing useSelector global state.
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsersProfile());
		} else {
			//is not admin, kick them out
			history.push("/login");
		}
	}, [dispatch, history]);

	return (
		<>
			<Card className="my-3 p-3 rounded product-holder">
				<h1>Users</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>ADMIN</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td>
										{user.isAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: "green" }}
											></i>
										) : (
											<i className="fas fa-time" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/user/${user._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>
										<Button
											variant="primary"
											className="btn-sm"
											onClick={() => deleteHandler(user._id)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Card>
		</>
	);
};

export default UserListScreen;
