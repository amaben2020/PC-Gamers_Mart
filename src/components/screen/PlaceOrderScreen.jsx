import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, ListGroup, Image, Card, Row } from "react-bootstrap";
import ErrorMessage from "./../../messages/ErrorMessage";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder } from "../../actions/orderActions";

import { Link } from "react-router-dom";
const PlaceOrderScreen = ({ history, match }) => {
	const orderCreator = useSelector((state) => state.orderCreator);
	const { order, error, success } = orderCreator;
	console.log("Customer Order Created:", order);

	//getting the shippingAddress info

	//to get the cart state
	const cart = useSelector((state) => state.cart);

	const dispatch = useDispatch();
	// console.log(cart.cartItems);//product, countInStock,name, price etc

	const addDecimals = (num) => {
		return Math.round(num * 100) / 100;
	};

	//creating the cart.ItemsPrice by adding the item price * quantity
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	localStorage.setItem("cartItemPrice", cart.itemsPrice);
	cart.shippingPrice = addDecimals(cart.itemsPrice < 10000 ? 0 : 10000);

	//calculating the tax price
	cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));

	const orderId = match.params.id;
	//we use useEffect to dynamically update our state based on parameters
	useEffect(() => {
		//remember that success is true if the order is successfully created
		if (success) {
			history.push(`/order/${order._id}`);
		}
	}, [history, success, orderId]); //order._id

	const placeOrderHandler = () => {
		//where you dispatch the place order action to backend by sending the values dia
		//These values are the values you filled in the cart previously
		//The names must match with the req.body in the orderController.js in the backend
		//the object instde the dispatch is the order parameter in the action
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAdd,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>

							<p>
								<strong>Address: </strong> {cart.shippingAddress.address}
							</p>
							<p>
								<strong>State: </strong> {cart.shippingAddress.state}
							</p>
							<p>
								<strong>LGA: </strong> {cart.shippingAddress.lga}
							</p>
							<p>
								<strong>Landmark: </strong> {cart.shippingAddress.homeLandmark}
							</p>
							<p>
								<strong>City: </strong> {cart.shippingAddress.city}
							</p>
							<p>
								<strong>Postal Code: </strong> {cart.shippingAddress.postalCode}
							</p>
							<p>
								<strong>Country: </strong> {cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>

							<p>
								<strong>Method: </strong> {cart.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>

							{cart.cartItems.length === 0 ? (
								<ErrorMessage>Your cart is empty</ErrorMessage>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
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
													{item.qty} * &#8358;{item.price} = &#8358;
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
										<Col>Total Price</Col>
										<Col>&#8358;{cart.itemsPrice.toLocaleString("en")}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col>&#8358;{cart.shippingPrice.toLocaleString("en")}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Tax</Col>
										<Col>&#8358;{cart.taxPrice.toLocaleString("en")}</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup.Item>

							<ListGroup.Item>
								{error && (
									<ErrorMessage variant="danger"> {error}</ErrorMessage>
								)}
							</ListGroup.Item>
							<Button
								onClick={placeOrderHandler}
								type="button"
								className="btn-block"
								disabled={cart.cartItems === 0}
							>
								{" "}
								Place Order
							</Button>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
