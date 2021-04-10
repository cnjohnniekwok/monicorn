import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState("");
	const submitHandler = (event) => {
		event.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};
	return (
		<Form onSubmit={submitHandler} inline>
			<Row>
				<Col className="align-items-left">
					<Form.Control
						type="text"
						name="q"
						onChange={(event) => setKeyword(event.target.value)}
						placeholder="Search Product..."
						className="mr-sm2 ml-sm-5"
					></Form.Control>
				</Col>
				<Col className="align-items-left">
					<Button type="submit" variant="outline-light" className="ml-2">
						Search
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default SearchBox;
