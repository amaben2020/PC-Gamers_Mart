import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productReviewCreateReducer,
	topRatedProductReducer,
} from "./actions/productReducers";
import { cartReducers } from "./actions/cartReducers";
import {
	userLoginReducer,
	userDetailsReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
	adminProfileListReducer,
} from "./actions/userReducers";
import {
	orderReducers,
	orderDetailsReducers,
	orderPayReducer,
	orderListReducer,
	orderListMyReducer,
	orderDeliverReducer,
} from "./actions/orderReducers";
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productReviewCreate: productReviewCreateReducer,
	topTatedProduct: topRatedProductReducer,
	cart: cartReducers,
	userLogin: userLoginReducer,
	userDetails: userDetailsReducer,
	userRegister: userRegisterReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	orderCreator: orderReducers,
	orderDetails: orderDetailsReducers,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
	orderDeliver: orderDeliverReducer,
	adminProfileList: adminProfileListReducer,
});

//storing backend products/:id property in cartItems state
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems")) //removed JSON.parse
	: [];

// if we have a userInfo in storage, then convert to an object for us to use
const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: "";

//Putting the cartItems in a global state
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAdd: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};
//console.log(initialState.cart.paymentMethod);

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
