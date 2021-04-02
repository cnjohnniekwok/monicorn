import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const product = ({ productProps }) => {
	return (
		<Card className="my-3 p-3 rounded product-holder">
			<Link to={`/product/${productProps._id}`}>
				<Card.Img src={productProps.image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/product/${productProps._id}`}>
					<Card.Title as="div">
						<strong>{productProps.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div">
					<Rating
						value={productProps.rating}
						text={`${productProps.numReviews} reviews`}
					/>
				</Card.Text>

				<Card.Text as="h3">£{productProps.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default product;
