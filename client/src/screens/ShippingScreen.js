import React, { useState } from "react";
import { ListGroup, Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { saveShippingAddress } from "../actions/cartAction";

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country })); //saves shipping address info into local storage for user returning use.
		history.push("/payment");
	};

	return (
		<>
			<CheckOutSteps step1 step2 />
			<FormContainer>
				<ListGroup>
					<Card className="my-3 p-3 rounded product-holder">
						<h1>Shipping</h1>
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="address">
								<Form.Label>Address</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter address"
									value={address}
									required
									onChange={(event) => {
										return setAddress(event.target.value);
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId="city">
								<Form.Label>City</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter city"
									value={city}
									required
									onChange={(event) => {
										return setCity(event.target.value);
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId="postalCode">
								<Form.Label>Postal Code</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter postal code"
									value={postalCode}
									required
									onChange={(event) => {
										return setPostalCode(event.target.value);
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group controlId="country">
								<Form.Label>Country</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter country"
									value={country}
									required
									onChange={(event) => {
										return setCountry(event.target.value);
									}}
								></Form.Control>
							</Form.Group>
							<Button type="submit" varanit="primary">
								Continue
							</Button>
						</Form>
					</Card>
				</ListGroup>
			</FormContainer>
		</>
	);
};

export default ShippingScreen;
