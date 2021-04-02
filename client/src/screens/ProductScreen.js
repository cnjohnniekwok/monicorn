import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = (props) => {
	//gonna be an empty array if there's no product return
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(
				//when using "`" no need to use qoutes '"'
				`/api/products/${props.match.params.id}`
			);
			setProduct(data);
		};

		fetchProduct();
	}, [props.match.params.id]);

	// // fake product data from product.js JSON.
	// const product = products.find(
	// 	//props.match has params for URL/:id <-- like express req.body.params.id
	// 	(product) => product._id === props.match.params.id
	// );

	return (
		<>
			<Link className="btn btn-secondary my-3" to="/">
				Return to home
			</Link>
			<Card className="my-3 p-3 rounded product-holder">
				<Row>
					<Col md={6}>
						{/* Use fluid to keep image inside of the container */}
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: £{product.price}</ListGroup.Item>
							<ListGroup.Item>
								Discription: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>£{product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Stocks:</Col>
									<Col>
										{`${
											product.countInStock > 0 ? "In Stock" : "Out of Stock"
										} (${product.countInStock})`}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{/* set disable to True if product count is 0 */}
								<Button
									className="btn-block btn-secondary"
									type="button"
									disabled={product.countInStock === 0}
								>
									Add To CART
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default ProductScreen;
