import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./../../messages/ErrorMessage";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loading from "./../../messages/Loading";
import FormContainer from "./FormContainer/FormContainer.js";
import { register } from "./../../actions/userActions";
import { getUserDetails } from "./../../actions/userActions";
import { Row } from "react-bootstrap";
// getUserDetails:  createdAt,email,isAdmin: false,name: "Jane Doe",updatedAt,_id excluding token cos we used .select('-password) in the backend

const UserEditScreen = ({ location, history, match }) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	//getting the user id so it mimicks postman i.e PUT http://localhost:9000/api/users/6060767188f29d2030440c22
	const userId = match.params.id;

	//Redirect moves you to the homepage '/' when you successfully login
	const redirect = location.search ? location.search.split("=")[1] : "/";
	console.log(redirect);
	console.log(location);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	console.log(user);

	const submitHandler = (e) => {
		e.preventDefault();
	};

	//This useEffecr simply makes the data available for the user's information that would be updated
	useEffect(() => {
		//if there isnt a username in the name field or the userid in the database doesnt match with the one we selected.... kinda impossible but just making sure all is well, the display the userDetails from backend for that user
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, user._id]);

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				{" "}
				Go Back
			</Link>
			<FormContainer>
				<h1> Edit User</h1>
				{loading ? (
					<Loading />
				) : error ? (
					<ErrorMessage variant="danger"> {error}</ErrorMessage>
				) : (
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
						<Form.Group controlId="isadmin">
							<Row>
								<Form.Label className="mr-3">Is Admin</Form.Label>
								<Form.Check
									type="checkbox"
									checked={isAdmin}
									onChange={(e) => setIsAdmin(e.target.checked)}
								></Form.Check>
							</Row>
						</Form.Group>

						<Button type="submit" variant="primary">
							SIGN UP
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
