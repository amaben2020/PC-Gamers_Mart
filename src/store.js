import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
} from "./actions/productReducers";
import { cartReducers } from "./actions/cartReducers";

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducers,
});

//storing backend products/:id property in cartItems state
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems")) //removed JSON.parse
	: [];
console.log("This is an", typeof cartItemsFromStorage);

//Putting the cartItems in a global state
const initialState = {
	cart: { cartItems: cartItemsFromStorage },
};
console.log(initialState.cart);
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
