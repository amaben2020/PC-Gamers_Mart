import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./../../messages/ErrorMessage";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Form, Button, Card } from "react-bootstrap";
import { addToCart } from "./../../actions/cartActions.js";
const CartScreen = ({ match, location, history }) => {
	//set the product id variable to the selected product's id
	const productId = match.params.id;
	// qty should be localhost://api/products/sans89as9s838?qty=3; 3 would be selected
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	console.log(cartItems);
	useEffect(() => {
		//we only wanna addToCart if there is a productId
		if (productId) {
			dispatch(addToCart(qty, productId));
		}
	}, [dispatch, productId, qty]);

	return <div>cart</div>;
};

export default CartScreen;
