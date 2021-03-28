import { getOrderDetails } from "./../../actions/orderActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PayPalButton } from "react-paypal-button-v2";
import { Col, ListGroup, Image, Card, Row } from "react-bootstrap";
import Loading from "./../../messages/Loading";
import ErrorMessage from "./../../messages/ErrorMessage";
import { payOrder } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { ORDER_PAY_RESET } from "./../../constants/orderConstants";
const OrderScreen = ({ match }) => {
	//creating a state that holds the sdk script when created
	const [sdkReady, setSdkReady] = useState(false);

	//extracting the ID from the url
	const orderId = match.params.id;

	const orderDetails = useSelector((state) => state.orderDetails);

	const { order, loading, error } = orderDetails;
	console.log("This is order:", order);

	const pay = localStorage.getItem("paymentMethod")
		? JSON.parse(localStorage.getItem("paymentMethod"))
		: "";
	console.log(pay);

	const shippingAddress = useSelector((state) => state.cart.shippingAdd);

	if (!loading) {
		const addDecimals = (num) => {
			return Math.round(num * 100) / 100;
		};

		//creating the cart.ItemsPrice by adding the item price * quantity
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;
	//console.log("ORDERPAY:", orderPay);

	const successPaymentHandler = (paymentResult) => {
		console.log("FROM PAYPAL:", paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	const dispatch = useDispatch();
	// console.log(cart.cartItems)//product, countInStock,name, price etc

	//we use useEffect to dynamically update our state based on parameters
	useEffect(() => {
		//getting the clientId from backend
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script"); //this creates a script tag <script></script>
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			//when the component mounts with the SDK, lets set the SDK state to true
			script.onload = () => {
				setSdkReady(true);
			};
			//add the script to the body after it loads
			document.body.appendChild(script);
			//we now check from our orderPayReducer if success is true
		};
		addPayPalScript();
		//This loads the order again but this time around its paid
		if (!order || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, orderId]);

	// localStorage.setItem("success", JSON.parse(successPay));
	// console.log("successPay:", successPay);

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
									{successPay ? (
										<ErrorMessage variant="success">
											Paid by {order.user.name}
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
												<Col> &#8358; {order.itemsPrice}</Col>
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
									{!order.isPaid && ( //making sure the product hasn't been paid for
										<ListGroup.Item>
											{loadingPay && <Loading />}
											{!sdkReady ? (
												<Loading />
											) : (
												<PayPalButton
													amount={order.itemsPrice}
													onSuccess={successPaymentHandler}
												/>
											)}
										</ListGroup.Item>
									)}
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
