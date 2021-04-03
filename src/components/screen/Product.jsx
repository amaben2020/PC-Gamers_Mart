import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
	return (
		<div>
			<Card className="my-3 p-3 rounded" style={{ backgroundColor: "#d4d4d4" }}>
				<Link to={`/product/${product._id}`}>
					<div className="inner">
						<Card.Img src={product.image} />
					</div>
				</Link>
				<Card.Body>
					<Link to={`/product/${product._id}`}>
						<Card.Title as="div">
							<strong>{product.name}</strong>
						</Card.Title>
						<Card.Text as="div">
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</Card.Text>
						<Card.Text as="h3">
							&#8358;{product.price.toLocaleString("en")}
						</Card.Text>
					</Link>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Product;
