import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsersProfile, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	//bring this in to check if user has already login
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDeletedUser } = userDelete; // useSelector to get updated state of userDelete

	const deleteHandler = (userId, userName) => {
		//onClick actions goes here
		if (window.confirm(`Are you sure to remove user (${userName}) ?`))
			dispatch(deleteUser(userId));
	};

	useEffect(() => {
		//this userInfo got from userLogin useing useSelector global state.
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsersProfile());
		} else {
			//is not admin, kick them out
			history.push("/login");
		}
	}, [dispatch, history, successDeletedUser, userInfo]); //change effect will run again due to dependency changes

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
								<th>NAME</th>
								<th>EMAIL</th>
								<th>ADMIN</th>
								<th>ACTIONS</th>
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
										<LinkContainer to={`/admin/user/${user._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>

										<Button
											variant="primary"
											className="btn-sm ml-2"
											onClick={() => deleteHandler(user._id, user.name)}
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
