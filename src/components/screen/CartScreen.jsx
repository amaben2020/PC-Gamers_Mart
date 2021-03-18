import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./../../messages/ErrorMessage";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	ListGroup,
	Form,
	Button,
	Card,
	Image,
} from "react-bootstrap";
import { addToCart } from "./../../actions/cartActions.js";
import { removeFromCart } from "./../../actions/cartActions.js";
const CartScreen = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	//set the product id variable to the selected product's id
	const productId = match.params.id;
	// qty should be localhost://api/products/sans89as9s838?qty=3; 3 would be selected
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const { cartItems } = cart;

	useEffect(() => {
		//we only wanna addToCart if there is a productId
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	//if loggedIn, then redirect into shipping
	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>

				{cartItems.length === 0 ? (
					<ErrorMessage>
						Your cart is empty <Link to="/">Please go back</Link>
					</ErrorMessage>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/products/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											style={{ width: " 8vw" }}
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product),
													Number(e.target.value)
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((number) => (
												<option value={number + 1} key={number + 1}>
													{number + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeCartHandler(item.product)}
										>
											<i className="fas fa-trash"> </i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>
								Subtotal (
								{cartItems.reduce(
									(acc, currentValue) => acc + currentValue.qty,
									0
								)}
								)
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
