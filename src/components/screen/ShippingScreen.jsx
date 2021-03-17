import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "./../../actions/cartActions";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer/FormContainer.js";

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAdd } = cart;
	const dispatch = useDispatch();

	const [address, setAddress] = useState(shippingAdd.address);
	const [country, setCountry] = useState(shippingAdd.country);
	const [state, setState] = useState(shippingAdd.state);
	const [postalCode, setPostalCode] = useState(shippingAdd.postalCode);
	const [city, setCity] = useState(shippingAdd.city);
	const [lga, setLga] = useState(shippingAdd.lga);
	const [homeLandmark, setHomeLandmark] = useState(shippingAdd.homeLandmark);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddress({
				address,
				country,
				homeLandmark,
				lga,
				postalCode,
				city,
				state,
			})
		);
		history.push("/payment");
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Enter Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Enter country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="state">
					<Form.Label>State of Residence</Form.Label>
					<Form.Control
						type="text"
						placeholder="The state you presently reside"
						value={state}
						required
						onChange={(e) => setState(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Label>postalCode</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Enter postalCode"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="lga">
					<Form.Label>lga</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Enter lga"
						value={lga}
						onChange={(e) => setLga(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="homeLandmark">
					<Form.Label>Home Landmark</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Enter home Landmark"
						value={homeLandmark}
						onChange={(e) => setHomeLandmark(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						required
						placeholder="Enter City i.e Abuja, Onitsha"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
