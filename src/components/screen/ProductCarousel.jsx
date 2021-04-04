import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { listTopProduct } from "./../../actions/productListActions";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../messages/Loading";
import ErrorMessage from "../../messages/ErrorMessage";
const ProductCarousel = () => {
	const dispatch = useDispatch();
	const topRatedProduct = useSelector((state) => state.topRatedProduct);
	const { products, loading, error } = topRatedProduct;

	useEffect(() => {
		dispatch(listTopProduct());
	}, [dispatch]);
	return loading ? (
		<Loading />
	) : error ? (
		<ErrorMessage variant="danger">{error}</ErrorMessage>
	) : (
		<Carousel pause="hover" className="bg-dark">
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className="carousel-caption">
							<h2>
								{" "}
								{product.name} ({product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
