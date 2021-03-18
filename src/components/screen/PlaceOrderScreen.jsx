import React from "react";
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
import FormContainer from "./FormContainer/FormContainer.js";
import ErrorMessage from "./../../messages/ErrorMessage";
import CheckoutSteps from "./CheckoutSteps";
import { Link } from "react-router-dom";
const PlaceOrderScreen = () => {
	//to get the cart state
	const cart = useSelector((state) => state.cart);
	// console.log(cart); cartItems with shippingAddress object, itemsPrice
	const { address } = cart;

	// console.log(cart.cartItems);//product, countInStock,name, price etc

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	//creating the cart.ItemsPrice by adding the item price * quantity
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice < 100 ? 0 : 100);

	//calculating the tax price
	cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));

	const placeOrderHandler = () => {
		console.log("click");
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
													{item.qty} * ${item.price} = ${item.qty * item.price}
												</Col>
												<Col md={4}>
													<Card>
														<ListGroup variant="flush">
															<ListGroup.Item>
																<h2>Order Summary</h2>
																<ListGroup.Item>
																	<Row>
																		<Col>Items</Col>
																		<Col>${cart.itemsPrice}</Col>
																	</Row>
																</ListGroup.Item>
																<ListGroup.Item>
																	<Row>
																		<Col>Shipping</Col>
																		<Col>${cart.shippingPrice}</Col>
																	</Row>
																</ListGroup.Item>
																<ListGroup.Item>
																	<Row>
																		<Col>Tax</Col>
																		<Col>${cart.taxPrice}</Col>
																	</Row>
																</ListGroup.Item>
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
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
