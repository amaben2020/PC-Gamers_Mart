import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./../../messages/ErrorMessage";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loading from "./../../messages/Loading";
import FormContainer from "./FormContainer/FormContainer.js";
import { updateUser } from "./../../actions/userActions";
import { getUserDetails, getUserForAdmin } from "./../../actions/userActions";
import { Row } from "react-bootstrap";
import { USER_UPDATE_RESET } from "../../constants/userConstants.js";
// getUserDetails:  createdAt,email,isAdmin: false,name: "Jane Doe",updatedAt,_id excluding token cos we used .select('-password) in the backend

const UserEditScreen = ({ location, history, match }) => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	const dispatch = useDispatch();

	//getting the user id so it mimicks postman i.e PUT http://localhost:9000/api/users/6060767188f29d2030440c22
	const userId = match.params.id;

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	console.log(userDetails);

	const adminProfileList = useSelector((state) => state.adminProfileList);
	const {
		loading: loadingAdminProfileEdit,
		error: errorAdminProfileEdit,
		user: userAdminProfileEdit,
	} = adminProfileList;
	console.log(userDetails);
	console.log(userAdminProfileEdit.name);

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUser({
				_id: userId,
				name,
				email,
				isAdmin,
			})
		);
	};

	//This useEffect simply makes the data available for the user's information that would be updated
	useEffect(() => {
		// if the update is successful, update the user details and redirect to userlist
		if (successUpdate) {
			//reset the state after update is successful and move admin to /userlist
			dispatch({ type: USER_UPDATE_RESET });
			history.push("/admin/userlist");
		} else {
			//if there isnt a username in the name field or the userid in the database doesnt match with the one we selected.... kinda impossible but just making sure all is well, the display the userDetails from backend for that user
			if (!userAdminProfileEdit.name || userAdminProfileEdit._id !== userId) {
				dispatch(getUserForAdmin(userId));

				//dispatch(getUserDetails(user._id));
			} else {
				setName(userAdminProfileEdit.name);
				setEmail(userAdminProfileEdit.email);
				setIsAdmin(userAdminProfileEdit.isAdmin);
			}
		}
	}, [user, dispatch, userId, successUpdate, history, userAdminProfileEdit]);

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				{" "}
				Go Back
			</Link>
			<FormContainer>
				<h1> Edit User</h1>
				{loadingUpdate && <Loading />}
				{errorUpdate && (
					<ErrorMessage variant="danger">{errorUpdate}</ErrorMessage>
				)}
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
							UPDATE
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
