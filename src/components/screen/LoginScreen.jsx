import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./../../messages/ErrorMessage";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loading from "./../../messages/Loading";
import FormContainer from "./FormContainer/FormContainer.js";
import { login } from "./../../actions/userActions";
const LoginScreen = ({ location, history }) => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split("=")[1] : "/";
	console.log(redirect);
	console.log(location);

	const submitHandler = () => {
		console.log("clicked");
	};

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
		dispatch(login(email, password));
	}, [history, userInfo, redirect]);

	return (
		<FormContainer>
			<h1> Sign In</h1>
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			<Form onSubmit={submitHandler}>
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
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Email"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					SIGN IN
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New Customer ?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						{" "}
						Register{" "}
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
