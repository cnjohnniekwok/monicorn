import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listAllOrders, deleteOrder } from "../actions/orderActions";
import Meta from "../components/Meta";

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	//bring this in to check if user has already login
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { loading: loadingDel, success: successDel } = orderDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listAllOrders());
		} else {
			//is not admin, kick them out
			history.push("/login");
		}
	}, [dispatch, history, userInfo, successDel]); //change effect will run again due to dependency changes

	const deleteHandler = (order, userName) => {
		//onClick actions goes here
		if (
			window.confirm(
				`Are you sure to remove order ID (${order._id}) for user (${userName})?`
			)
		) {
			dispatch(deleteOrder(order));
		}
	};

	return (
		<>
			<Meta title="Customer Orders" />
			<Card className="my-3 p-3 rounded product-holder">
				<h1>Orders</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>USER ID</th>
								<th>USER NAME</th>
								<th>TOTAL PRICE</th>
								<th>SHIPPING CITY</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.user._id}</td>
									<td>{order.user.name}</td>
									<td>£{order.totalPrice}</td>
									<td>{order.shippingAddress.city}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}/`}>
											<Button variant="light" className="btn-sm">
												Details
											</Button>
										</LinkContainer>

										{!order.isPaid && (
											<Button
												variant="primary"
												className="btn-sm ml-2"
												onClick={() => deleteHandler(order, order.user.name)}
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
		</>
	);
};

export default OrderListScreen;
