import React, { useState } from "react";
import { ListGroup, Card, Form, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { savePaymentMethod } from "../actions/cartAction";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useDispatch();

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(savePaymentMethod(paymentMethod)); //saves shipping address info into local storage for user returning use.
		dispatch({ type: ORDER_CREATE_RESET });
		history.push("/placeorder");
	};

	return (
		<>
			<CheckOutSteps step1 step2 step3 />
			<FormContainer>
				<ListGroup>
					<Card className="my-3 p-3 rounded product-holder">
						<h1>Payment Method</h1>
						<Form onSubmit={submitHandler}>
							<Form.Group>
								<Form.Label as="legend">Select Method</Form.Label>
								<Col>
									<Form.Check
										type="radio"
										label="PayPal or Creat Card"
										id="PayPal"
										name="paymentMethod"
										value="PayPal"
										checked
										onChange={(event) => setPaymentMethod(event.target.value)}
									></Form.Check>
									<Form.Check
										type="radio"
										label="Bitcoin"
										id="Bitcoin"
										name="paymentMethod"
										value="Bitcoin"
										disabled
										onChange={(event) => setPaymentMethod(event.target.value)}
									></Form.Check>
								</Col>
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

export default PaymentScreen;
