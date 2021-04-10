import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
	listProducts,
	deleteProduct,
	createProduct,
} from "../actions/productAction";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	//paging
	const pageNumber = match.params.pageNumber || 1;

	//bring this in to check if user has already login
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDel,
		error: errorDel,
		success: successProductDel,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	const deleteHandler = (productId, productName) => {
		//onClick actions goes here
		if (window.confirm(`Are you sure to remove product (${productName}) ?`)) {
			dispatch(deleteProduct(productId));
		}
	};

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });
		//this userInfo got from userLogin useing useSelector global state.
		if (userInfo && userInfo.isAdmin) {
			if (successCreate) {
				history.push(`/admin/products/${createdProduct._id}/edit`);
			} else {
				dispatch(listProducts("", pageNumber)); //passing empty keyword, and pagenumber
			}
		} else {
			//is not admin, kick them out
			history.push("/login");
		}
	}, [
		dispatch,
		history,
		pageNumber,
		userInfo,
		successProductDel,
		successCreate,
		createdProduct,
	]); //change effect will run again due to dependency changes

	return (
		<>
			<Card className="my-3 p-3 rounded product-holder">
				<Row className="align-items-center">
					<Col>
						<h1>Products</h1>
					</Col>
					<Col className="text-right">
						<Button className="my-3" onClick={createProductHandler}>
							<i className="fas fa-plus"></i> Create Product
						</Button>
					</Col>
				</Row>
				{loadingDel && <Loader />}
				{errorDel && <Message variant="danger">{error}</Message>}
				{loadingCreate && <Loader />}
				{errorCreate && <Message variant="danger">{error}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<>
						<Table striped bordered hover responsive className="table-sm">
							<thead>
								<tr>
									<th>ID</th>
									<th>NAME</th>
									<th>PRICE</th>
									<th>CATEGORY</th>
									<th>BRAND</th>
									<th>STOCK</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>£{product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>{product.countInStock}</td>
										<td>
											<LinkContainer to={`/admin/products/${product._id}/edit`}>
												<Button variant="light" className="btn-sm">
													<i className="fas fa-edit"></i>
												</Button>
											</LinkContainer>

											<Button
												variant="primary"
												className="btn-sm ml-2"
												onClick={() => deleteHandler(product._id, product.name)}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Paginate pages={pages} page={page} isAdmin={true} />
					</>
				)}
			</Card>
		</>
	);
};

export default ProductListScreen;
