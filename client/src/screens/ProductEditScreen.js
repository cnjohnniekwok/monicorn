import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails, updateProduct } from "../actions/productAction";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";
import Meta from "../components/Meta";

const ProductEditScreen = ({ history, match }) => {
	const productId = match.params.id;
	//to capture input and update state -: local state
	const [name, setName] = useState("No Title");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("/images/sample.jpg");
	const [brand, setBrand] = useState("No Brand");
	const [category, setCategory] = useState("No Category");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("No Description");
	const [uploading, setUploading] = useState(false);
	const dispatch = useDispatch();

	//declare global state (holder)
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	//if user already login, redirect user to
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push("/admin/productlist");
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, history, product, productId, successUpdate]);

	const uploadFileHandler = async (event) => {
		const file = event.target.files[0]; //get access to target file array of the upload (the first one only!)
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true); // make loader spin

		try {
			const config = {
				headers: { "Content-Typ": "multipart/form-data" },
			};

			const { data } = await axios.post("/api/upload", formData, config);
			setImage(data); //set the image path after upload
			setUploading(false); // stops the spin
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};

	return (
		<>
			<FormContainer>
				<ListGroup>
					<Card className="my-3 p-3 rounded product-holder">
						<Row>
							<Col>
								<h1>Edit Product</h1>
							</Col>
							<Col className="text-right">
								<Link to="/admin/productlist/" className="btn btn-light">
									Go back
								</Link>
							</Col>
						</Row>
						{loadingUpdate && <Loader />}
						{errorUpdate && <Message variant="danger">{error}</Message>}
						{loading ? (
							<Loader />
						) : error ? (
							<Message variant="danger">{error}</Message>
						) : (
							<Form onSubmit={submitHandler}>
								<Form.Group controlId="image">
									<Form.Label>Product Image</Form.Label>
									<Form.Control
										type="text"
										placeholder="image URL"
										value={image}
										onChange={(event) => {
											return setImage(event.target.value);
										}}
									></Form.Control>
									<Form.File
										id="image-file"
										label="Choose File"
										custom
										onChange={uploadFileHandler}
									></Form.File>
									{uploading && <Loader />}
								</Form.Group>

								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="name"
										placeholder="Enter Name"
										value={name}
										onChange={(event) => {
											return setName(event.target.value);
										}}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId="price">
									<Form.Label>Price</Form.Label>
									<Form.Control
										type="price"
										placeholder="Enter Product Price"
										value={price}
										onChange={(event) => {
											return setPrice(event.target.value);
										}}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId="brand">
									<Form.Label>Brand</Form.Label>
									<Form.Control
										type="brand"
										placeholder="Enter Product Brand"
										value={brand}
										onChange={(event) => {
											return setBrand(event.target.value);
										}}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId="category">
									<Form.Label>Category</Form.Label>
									<Form.Control
										type="category"
										placeholder="Enter Product Category"
										value={category}
										onChange={(event) => {
											return setCategory(event.target.value);
										}}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId="description">
									<Form.Label>Description</Form.Label>
									<Form.Control
										type="description"
										placeholder="Enter Product Description"
										value={description}
										onChange={(event) => {
											return setDescription(event.target.value);
										}}
									></Form.Control>
								</Form.Group>

								<Form.Group controlId="countInStock">
									<Form.Label>Count In Stocks</Form.Label>
									<Form.Control
										type="countInStock"
										placeholder="Enter Product Stocks"
										value={countInStock}
										onChange={(event) => {
											return setCountInStock(event.target.value);
										}}
									></Form.Control>
								</Form.Group>

								<Button type="submit" variant="primary">
									Update
								</Button>
							</Form>
						)}
					</Card>
				</ListGroup>
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
