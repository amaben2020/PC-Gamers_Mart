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
import {
	createProductReview,
	productDetailsAction,
} from "./../../actions/productListActions.js";
import Loading from "../../messages/Loading";
import ErrorMessage from "../../messages/ErrorMessage";
import { PRODUCT_REVIEW_RESET } from "./../../constants/constants.js";
import Meta from "../Meta";
const ProductScreen = ({ match, history }) => {
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const { product, loading, error } = productDetails;

	//getting the login state, so that a user must be logged in to review stuff
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//getting the success if the review and rating object is successfully created
	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		success: successReview,
		loading: loadingReview,
		error: errorReview,
	} = productReviewCreate;

	//Render the product based on IDs. FLUID: to keep in container
	useEffect(() => {
		if (successReview) {
			alert("Review submitted");
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_REVIEW_RESET });
		}
		dispatch(productDetailsAction(match.params.id));
	}, [dispatch, match, successReview]);
	//Once you select qty, you are pushed to localhost://api/products/9f2h893hf38h8?qty=3 this means you ordered for 3 quantities
	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<>
			<Meta title={product.name} />
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
				<>
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
								<ListGroup.Item>Price: &#8358;{product.price}</ListGroup.Item>
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
												<strong>&#8358;{product.price}</strong>
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
					{/**Would be taken out till database seeding issue is rectified */}
					{/** <Col md={6}>
						<h2> Reviews</h2>
						{product.reviews.length === 0 && (
							<ErrorMessage>
								No reviews by {userInfo.name} for this product
							</ErrorMessage>
						)}
						<ListGroup variant="flush">
							{product.reviews.map((review) => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>{review.createdAt.substring(0, 10)}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}
							<ListGroup.Item>
								<h2>Write a customer review</h2>
								{errorReview && (
									<ErrorMessage variant="danger">{errorReview}</ErrorMessage>
								)}
								{userInfo ? (
									<Form onSubmit="submitHandler">
										<Form.Group controlId="rating">
											<Form.Label>Rating</Form.Label>
											<Form.Control
												as="select"
												value="rating"
												onChange={(e) => setRating(e.target.value)}
											>
												<option value="">Select ...</option>
												<option value="1">1 - Poor</option>
												<option value="2">2 - Fair</option>
												<option value="3">3 - Good</option>
												<option value="4">4 - Very Good</option>
												<option value="5">5 - Excellent</option>
											</Form.Control>
										</Form.Group>
										<Form.Group>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as="textarea"
												row="3"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
											></Form.Control>
										</Form.Group>
										<Button type="submit" onClick={submitHandler}>Submit</Button>
									</Form>
								) : (
									<ErrorMessage>
										Please <Link to="login"> Sign in </Link> to leave a review
									</ErrorMessage>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Col>  */}
				</>
			)}
		</>
	);
};

export default ProductScreen;
