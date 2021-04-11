import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
			<Form.Control
				type="text"
				name="q"
				onChange={(event) => setKeyword(event.target.value)}
				placeholder="Search Product..."
				className="mr-sm-2 mt-2"
			></Form.Control>
			<Button type="submit" variant="outline-light" className="mt-2">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
