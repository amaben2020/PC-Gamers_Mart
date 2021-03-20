import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Card,
	Form,
} from "react-bootstrap";
import Rating from "./Rating";
import { useSelector, useDispatch } from "react-redux";
import { productDetailsAction } from "./../../actions/productListActions.js";
import Loading from "../../messages/Loading";
import ErrorMessage from "../../messages/ErrorMessage";
const ProductScreen = ({ match, history }) => {
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	console.log(productDetails);
	const [qty, setQty] = useState(1);
	const { product, loading, error } = productDetails;
	//Render the product based on IDs. FLUID: to keep in container
	useEffect(() => {
		dispatch(productDetailsAction(match.params.id));
	}, [dispatch, match]);
	//Once you select qty, you are pushed to localhost://api/products/9f2h893hf38h8?qty=3 this means you ordered for 3 quantities
	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<>
			<Link
				className="btn btn-light my-3 shadow-sm p-1 mb-1 bg-white rounded"
				to="/"
			>
				{" "}
				Go Back
			</Link>
			{loading ? (
				<Loading />
			) : error ? (
				<ErrorMessage variant="danger">{error}</ErrorMessage>
			) : (
				<Row>
					<Col md={6} className="shadow-lg p-1 mb-5 bg-white rounded">
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3} className="shadow-lg p-1 mb-1 bg-white rounded">
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty : </Col>
											<Col>
												<Form.Control
													style={{ width: " 8vw" }}
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map(
														(number) => (
															<option value={number + 1} key={number + 1}>
																{number + 1}
															</option>
														)
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<Button
									onClick={addToCartHandler}
									disabled={product.countInStock === 0}
									type="button"
									className="btn-block"
								>
									Add To Cart
								</Button>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
