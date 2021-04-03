import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { productListAction } from "./../../actions/productListActions.js";
import Loading from "../../messages/Loading";
import ErrorMessage from "../../messages/ErrorMessage";
const HomeScreen = ({ match }) => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	//This is coming from the search route query :keyword
	const keyword = match.params.keyword;
	useEffect(() => {
		//pass the keyword query to the action that fetches products
		dispatch(productListAction(keyword));
	}, [dispatch, keyword]);

	return (
		<>
			<h1> Latest Products</h1>
			{loading ? (
				<Loading />
			) : error ? (
				<ErrorMessage variant="danger">{error}</ErrorMessage>
			) : (
				<Row>
					{products.map((product) => (
						<Col
							className="shadow-lg p-3 m-3 bg-white rounded"
							key={product._id}
							sm={12}
							md={6}
							lg={4}
							xl={3}
						>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
