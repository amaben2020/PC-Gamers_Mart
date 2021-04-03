import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../messages/ErrorMessage";
import { Button, Table } from "react-bootstrap";
import Loading from "../../messages/Loading";
import { deleteUser } from "./../../actions/userActions";
import { listUsers } from "../../actions/userActions";
import { listOrders } from "../../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const userList = useSelector((store) => store.userList);
	//for all users
	const { users, error, loading } = userList;
	//for an individual user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//getting ALL the orders from backend associated with a user
	const orderList = useSelector((state) => state.orderList);
	const { orders } = orderList;

	useEffect(() => {
		if (!userInfo && !userInfo.isAdmin) {
			history.push("/login");
		}
		//only display or list all users if the user is an admin
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
			dispatch(listOrders());
		} else {
			history.push("/login");
		}
	}, [dispatch, userInfo, history]);

	return (
		<div>
			<h1>Orders </h1>
			<h3>
				Welcome, <span style={{ fontSize: 14 }}>{userInfo.name} </span>{" "}
			</h3>
			{loading ? (
				<Loading />
			) : error ? (
				<ErrorMessage variant="danger">{error}</ErrorMessage>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, idx) => (
							<tr key={idx}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>

								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.isPaidAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}>
											Not Paid
										</i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}>
											Not Delivered
										</i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${order._id}`}>
										<Button variant="light" className="btn-sm">
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default OrderListScreen;
