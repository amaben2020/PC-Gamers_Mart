import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./../constants/cartConstants";
import axios from "axios";

export const addToCart = (qty, id) => async (dispatch, getState) => {
	//qty is a parameter
	//fetch the individual product with id
	const { data } = await axios.get(`/api/products/${id}`);
	console.log(data);
	// data are the properties from backend of an individual product
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			countInStock: data.countInStock,
			qty,
		},
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
