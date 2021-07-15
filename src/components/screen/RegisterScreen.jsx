import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from './../../messages/ErrorMessage';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loading from './../../messages/Loading';
import FormContainer from './FormContainer/FormContainer.js';
import { register } from './../../actions/userActions';

const RegisterScreen = ({ location, history }) => {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	//message state is created to render passwords do not match info
	const [message, setMessage] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	//Redirect moves you to the homepage '/' when you successfully login
	const redirect = location.search ? location.search.split('=')[1] : '/';
	console.log(redirect);
	console.log(location.search);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	//userInfo is the token, if the token is available, redirect to homepage
	useEffect(() => {
		if (userInfo) {
			setMessage('Successfully Registered');
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	return (
		<FormContainer>
			<h1> Sign Up</h1>
			{message}
			{message && <ErrorMessage> {message}</ErrorMessage>}
			{error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
			{loading && <Loading />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					SIGN UP
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an Account ?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						{' '}
						Login{' '}
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
