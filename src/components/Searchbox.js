import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Searchbox = ({ history }) => {
	const [keyword, setKeyword] = useState("");
	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.pushState(`/search/${keyword}`);
		} else {
			history.pushState("/");
		}
	};
	return (
		<div>
			<Form onSubmit={submitHandler} inline>
				<Form.Control
					placeholder="Search products ... "
					className="mr-sm-2-ml-sm-5"
					type="text"
					name="q"
					onChange={(e) => setKeyword(e.target.value)}
				></Form.Control>
				<Button type="submit" variant="outline-success" className="p-2">
					Search
				</Button>
			</Form>
		</div>
	);
};

export default Searchbox;
