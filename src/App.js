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
import OrderScreen from "./components/screen/OrderScreen";
import UserListScreen from "./components/screen/UserListScreen";
import UserEditScreen from "./components/screen/UserEditScreen";
import ProductListScreen from "./components/screen/ProductListScreen";
import ProductEditScreen from "./components/screen/ProductEditScreen";
import OrderListScreen from "./components/screen/OrderListScreen";
import Searchbox from "./components/Searchbox";
function App() {
	return (
		<Router>
			<Header />
			<main className="py-3 ">
				<Container>
					<Route path="/login" component={LoginScreen} exact />
					<Route path="/admin/userlist" component={UserListScreen} exact />
					<Route
						path="/admin/productlist"
						component={ProductListScreen}
						exact
					/>
					<Route
						path="/admin/product/:id/edit"
						component={ProductEditScreen}
						exact
					/>

					<Route path="/admin/orderlist" component={OrderListScreen} exact />
					<Route path="/admin/user/:id/edit" component={UserEditScreen} exact />
					<Route path="/order/:id" component={OrderScreen} exact />
					<Route path="/placeorder" component={PlaceOrderScreen} exact />
					<Route path="/payment" component={PaymentScreen} exact />
					<Route path="/shipping" component={ShippingScreen} exact />
					<Route path="/register" component={RegisterScreen} exact />
					<Route path="/profile" component={ProfileScreen} exact />
					<Route path="/" component={HomeScreen} exact />
					<Route path="/page/:pageNumber" component={HomeScreen} exact />
					<Route
						path="/search/:keyword/page/pageNumber"
						component={HomeScreen}
						exact
					/>
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/search/:keyword" component={HomeScreen} exact />
					<Route path="/cart/:id?" component={CartScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
