import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./../../messages/ErrorMessage";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Loading from "./../../messages/Loading";
import { listMyOrders } from "./../../actions/orderActions.js";
import { getUserDetails, updateUserProfile } from "./../../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";

const LoginScreen = ({ location, history }) => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState("");
	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	//user is the state of our userDetailsReducer
	const { loading, error, user } = userDetails;

	const itemsPrice = localStorage.getItem("cartItemPrice");

	const orderListMy = useSelector((state) => state.orderListMy);
	const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;
	console.log("ORDERS SCREEN DATA:", orders);

	useEffect(() => {
		dispatch(listMyOrders());
	}, [dispatch]);

	//This is the state from the store reducer
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;
	//getting the usreInfo from the userLogin state
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, dispatch, user]);

	const successFul = localStorage.getItem("__paypal_storage__");

	console.log(successFul);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name,
					email,
					password,
				})
			);
		}
	};

	//userInfo is the token, if the token is available, redirect to homepage

	return (
		<Row>
			<Col md={3}>
				<h2> User Profile</h2>
				{message && <ErrorMessage> {message}</ErrorMessage>}
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{success && <ErrorMessage>Profile Successfully updated</ErrorMessage>}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary">
						UPDATE
					</Button>
				</Form>
			</Col>{" "}
			<Row className="py-3">
				<Col md={12}>
					<h2>My Orders</h2>
					{loadingOrders ? (
						<Loading />
					) : errorOrders ? (
						<ErrorMessage variant="danger">{errorOrders}</ErrorMessage>
					) : (
						<Table striped bordered hover responsive className="table-sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>TOTAL</th>
									<th>PAID</th>
									<th>DELIVERED</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order.id}>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{itemsPrice}</td>
										<td>
											{successFul ? (
												<i className="fas fa-check" style={{ color: "green" }}>
													{" "}
												</i>
											) : (
												<i
													className="fas fa-times"
													style={{ color: "red" }}
												></i>
											)}
										</td>
										{order.isDelivered && order.deliveredAt.substring(0, 10)}
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant="dark" className="btn-sm">
												Details
											</Button>
										</LinkContainer>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</Row>
	);
};

export default LoginScreen;
