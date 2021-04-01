import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../messages/ErrorMessage";
import { Button, Table, Row, Col } from "react-bootstrap";
import Loading from "../../messages/Loading";
import { deleteUser } from "./../../actions/userActions";
import { listProducts } from "../../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
const ProductListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const userList = useSelector((store) => store.userList);
	//for all users
	const { users, error, loading } = userList;
	//for an individual user
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		//only display or list all products if the user is an admin
		//we are doing userInfo && userInfo.isAdmin to avoid errors
		if (userInfo && userInfo.isAdmin) {
			dispatch(listProducts());
		} else {
			history.push("/login");
		}
	}, [dispatch, successDelete, userInfo, history]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			//dispatch(deleteProduct(id));
			console.log("deleted");
		} else {
			<ErrorMessage variant="danger"> Product Not Deleted</ErrorMessage>;
		}
	};

	const createProductHandler = (product) => {
		console.log("product created");
	};

	return (
		<div>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button onClick={createProductHandler}>
						{" "}
						<i className="fas-fa-plus"></i>Create Product
					</Button>
				</Col>
			</Row>

			{loading ? (
				<Loading />
			) : error ? (
				<ErrorMessage variant="danger">{error}</ErrorMessage>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th>edit/delete</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, idx) => (
							<tr key={idx}>
								<td>{product._id}</td>
								<td>{product.name}</td>

								<td> &#8358; {product.price.toLocaleString("en")}</td>
								<td> &#8358; {product.category}</td>
								<td> &#8358; {product.brand}</td>
								<td>
									{product.isDelivered ? (
										<i className="fas fa-check" style={{ color: "green" }}></i>
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>

									<Button
										variant="trash"
										className="btn-sm"
										onClick={() => deleteHandler(product._id)}
									>
										<i style={{ color: "red" }} className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default ProductListScreen;
