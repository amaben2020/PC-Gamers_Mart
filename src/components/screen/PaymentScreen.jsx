import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "./../../actions/cartActions";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "./FormContainer/FormContainer.js";
import CheckoutSteps from "./CheckoutSteps";

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAdd } = cart;
	const dispatch = useDispatch();

	const [paymentMethod, setPaymentMethod] = useState("Paypal");

	//if there's no shipping addres
	if (!shippingAdd) {
		history.push("/shipping");
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	return (
		<FormContainer>
			{/**The steps simply mean highlighted steps that have been fulfilled, if you don't match all criteria, you cannot see that screen. */}
			<CheckoutSteps step1 step2 step3 />

			<h1>Payment Method</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="Paypal or CreditCard"
							id="paypal"
							name="paymentMethod"
							value="Paypal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
