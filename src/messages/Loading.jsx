import React from "react";
import { Spinner } from "react-bootstrap";
const Loading = () => {
	return (
		<Spinner
			animation="border"
			role="status"
			style={{
				width: "250px",
				height: "250px",
				margin: "auto",
				display: "block",
			}}
		>
			<span className="sr-only"> Loading..... Please wait. </span>
		</Spinner>
	);
};

export default Loading;
