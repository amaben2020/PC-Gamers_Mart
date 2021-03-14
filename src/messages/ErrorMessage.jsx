import React from "react";
import { Alert } from "react-bootstrap";
const ErrorMessage = ({ variant, children }) => {
	//children is the error message
	return <Alert variant={variant}>{children}</Alert>;
};

ErrorMessage.defaultProps = {
	variant: "info", //blue information but changed to red
};

export default ErrorMessage;
