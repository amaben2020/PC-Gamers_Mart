import { getOrderDetails } from "./../../actions/orderActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "./../../actions/cartActions";
import {
	Form,
	Button,
	Col,
	ListGroup,
	Image,
	Card,
	Row,
} from "react-bootstrap";
import Loading from "./../../messages/Loading";
import ErrorMessage from "./../../messages/ErrorMessage";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import axios from "axios";
const OrderScreen = ({ match }) => {
	//to get the cart state

	//extracting the ID from the url
	const orderId = match.params.id;

	const orderDetails = useSelector((state) => state.orderDetails);

	const { order, loading, error } = orderDetails;
	console.log("This is order:", order);

	const paymentMtd = useSelector((state) => state.cart.paymentMethod);
	const { paymentMethod } = paymentMtd;
	console.log(paymentMethod);

	const pay = localStorage.getItem("paymentMethod")
		? JSON.parse(localStorage.getItem("paymentMethod"))
		: "";
	console.log(pay);

	const orderCreator = useSelector((state) => state.orderCreator);

	const shippingAddress = useSelector((state) => state.cart.shippingAdd);
	const {
		address,
		city,
		country,
		homeLandmark,
		state,
		lga,
		postalCode,
	} = shippingAddress;

	if (!loading) {
		const addDecimals = (num) => {
			return Math.round(num * 100) / 100;
		};

		//creating the cart.ItemsPrice by adding the item price * quantity
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	const dispatch = useDispatch();
	// console.log(cart.cartItems)//product, countInStock,name, price etc

	//we use useEffect to dynamically update our state based on parameters
	useEffect(() => {
		//getting the clientId from backend
		const addPayPalScript = async () => {
			axios.get("/api/config/paypal");
		};
		addPayPalScript();
		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	return (
		<>
			{loading ? (
				<Loading />
			) : error ? (
				<ErrorMessage variant="danger">{error}</ErrorMessage>
			) : (
				<>
					<h1>Place Order {order._id} </h1>

					<Row>
						<Col md={8}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Name: </strong> {order.user.name}
									</p>
									<p>
										<a href={`mailto: ${order.user.email}`}>
											Email: {order.user.email}
										</a>
									</p>

									<p>
										<strong>Address: </strong> {shippingAddress.address}
										{order.isDelivered && order.deliveredAt}
									</p>
									<p>
										<strong>State: </strong> {shippingAddress.state}
									</p>
									<p>
										<strong>LGA: </strong> {shippingAddress.lga}
									</p>
									<p>
										<strong>Landmark: </strong> {shippingAddress.homeLandmark}
									</p>
									<p>
										<strong>City: </strong> {shippingAddress.city}
									</p>
									<p>
										<strong>Postal Code: </strong> {shippingAddress.postalCode}
									</p>
									<p>
										<strong>Country: </strong> {shippingAddress.country}
									</p>
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>

									<p>
										<strong>Method: </strong> {pay}
									</p>
									{order.isPaid ? (
										<ErrorMessage variant="success">
											Paid on {order.paidAt}
										</ErrorMessage>
									) : (
										<ErrorMessage variant="danger">
											Not paid {order.paidAt}
										</ErrorMessage>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Order Items</h2>

									{order.orderItems.length === 0 ? (
										<ErrorMessage>Your order is empty</ErrorMessage>
									) : (
										<ListGroup variant="flush">
											{order.orderItems.map((item, index) => (
												<ListGroup.Item key={index}>
													<Row>
														<Col>
															<Image
																src={item.image}
																alt={item.name}
																fluid
																rounded
															/>
														</Col>
														<Col>
															<Link to={`/product/${item.product}`}>
																{item.name}
															</Link>
														</Col>
														<Col md={4}>
															{item.qty} * ${item.price} = $
															{item.qty * item.price}
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card className="my-3 shadow-sm p-1 mb-1 bg-white rounded">
								<ListGroup variant="flush">
									<ListGroup.Item>
										<h2>Order Summary</h2>
										<ListGroup.Item>
											<Row>
												<Col>Items</Col>
												<Col>${order.itemsPrice}</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>Shipping</Col>
												<Col>${order.shippingPrice}</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>Tax</Col>
												<Col>${order.taxPrice}</Col>
											</Row>
										</ListGroup.Item>
									</ListGroup.Item>

									<ListGroup.Item>
										{error && (
											<ErrorMessage variant="danger"> {error}</ErrorMessage>
										)}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
