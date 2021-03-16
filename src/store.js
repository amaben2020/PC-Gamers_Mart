import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
} from "./actions/productReducers";
import { cartReducers } from "./actions/cartReducers";
import { userLoginReducer } from "./actions/userReducers";
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducers,
	userLogin: userLoginReducer,
});

//storing backend products/:id property in cartItems state
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems")) //removed JSON.parse
	: [];
console.log("This is an", typeof cartItemsFromStorage);

// if we have a userInfo in storage, then convert to an object for us to use
const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

//Putting the cartItems in a global state
const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};
console.log(initialState.cart);
console.log(initialState.userLogin);
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
