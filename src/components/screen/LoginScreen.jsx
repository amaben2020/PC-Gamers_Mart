import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./../../messages/ErrorMessage";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loading from "./../../messages/Loading";
const LoginScreen = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);

	return <div></div>;
};

export default LoginScreen;
