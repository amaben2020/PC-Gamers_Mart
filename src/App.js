import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screen/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./components/screen/ProductScreen";
import CartScreen from "./components/screen/CartScreen";
import LoginScreen from "./components/screen/LoginScreen";
import RegisterScreen from "./components/screen/RegisterScreen";
import ProfileScreen from "./components/screen/ProfileScreen";
import ShippingScreen from "./components/screen/ShippingScreen";
import PaymentScreen from "./components/screen/PaymentScreen";
import PlaceOrderScreen from "./components/screen/PlaceOrderScreen";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-3 ">
				<Container>
					<Route path="/login" component={LoginScreen} exact />
					<Route path="/placeorder" component={PlaceOrderScreen} exact />
					<Route path="/payment" component={PaymentScreen} exact />
					<Route path="/shipping" component={ShippingScreen} exact />
					<Route path="/register" component={RegisterScreen} exact />
					<Route path="/profile" component={ProfileScreen} exact />
					<Route path="/" component={HomeScreen} exact />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
