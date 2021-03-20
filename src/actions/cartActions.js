import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "./../constants/cartConstants";
import axios from "axios";

//parameter ordering is extremely important
export const addToCart = (id, qty) => async (dispatch, getState) => {
	//qty is a parameter
	//fetch the individual product with id
	const { data } = await axios.get(`/api/products/${id}`);

	// data are the properties from backend of an individual product
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			countInStock: data.countInStock,
			price: data.price,
			category: data.category,
			qty,
		},
	});
	//you call the getState() function to retrieve cartItems from state
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: id });
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
	localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
	localStorage.setItem("paymentMethod", JSON.stringify(data));
};
