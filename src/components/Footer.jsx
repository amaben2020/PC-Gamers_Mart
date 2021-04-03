import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						Copyright &copy; PC Gamer's Mart{" "}
						<i className="fas fa-shopping-cart"></i>
						<i class="fas fa-gamepad"></i>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
