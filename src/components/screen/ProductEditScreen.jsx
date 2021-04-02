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
import { productDetailsAction } from "./../../actions/productListActions";

//yOU SIMPLY GET THE PRODUCT YOU WANNA EDIT
const ProductEditScreen = ({ location, history, match }) => {
	const productId = match.params.id;
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [price, setPrice] = useState(0);
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [category, setCategory] = useState("");

	const dispatch = useDispatch();

	const userId = match.params.id;

	const productDetails = useSelector((state) => state.productDetails);
	const { product } = productDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	const adminProfileList = useSelector((state) => state.adminProfileList);
	const {
		loading: loadingAdminProfileEdit,
		error: errorAdminProfileEdit,
		user: userAdminProfileEdit,
	} = adminProfileList;

	useEffect(() => {
		// simply render the list of products if there are none
		if (!product.name || product._id !== productId) {
			dispatch(productDetailsAction(productId));
		} else {
			setName(product.name);
			setBrand(product.brand);
			setDescription(product.description);
			setImage(product.image);
			setPrice(product.price);
			setCountInStock(product.countInStock);
			setCategory(product.category);
		}
	}, [dispatch]);
	const submitHandler = (e) => {
		e.preventDefault();
		//UPDATE PRODUCT
	};

	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				{" "}
				Go Back
			</Link>
			<FormContainer>
				<h1> Edit Product</h1>
				{loadingUpdate && <Loading />}
				{errorUpdate && (
					<ErrorMessage variant="danger">{errorUpdate}</ErrorMessage>
				)}
				{loadingAdminProfileEdit ? (
					<Loading />
				) : errorAdminProfileEdit ? (
					<ErrorMessage variant="danger"> {errorAdminProfileEdit}</ErrorMessage>
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

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="image">
							<Row>
								<Form.Label className="mr-3">Image</Form.Label>
								<Form.Check
									placeholder="Enter image url "
									type="text"
									value={image}
									onChange={(e) => setImage(e.target.value)}
								></Form.Check>
							</Row>
						</Form.Group>
						<Form.Group controlId="brand">
							<Row>
								<Form.Label className="mr-3">Brand</Form.Label>
								<Form.Check
									type="brand"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								></Form.Check>
							</Row>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter count In Stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
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

export default ProductEditScreen;
