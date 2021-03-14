import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
} from "./../constants/constants";
import axios from "axios";

export const productListAction = () => async (dispatch) => {
	dispatch({ type: PRODUCT_LIST_REQUEST });

	try {
		const { data } = await axios.get("/api/products");
		console.log(data);
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		//Dispatching error, if there is a custom error, fire that one, else use generic error
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.data.message
					: error.message,
		});
	}
};

export const productDetailsAction = (id) => async (dispatch) => {
	dispatch({ type: PRODUCT_DETAILS_REQUEST });

	try {
		const { data } = await axios.get(`/api/products/${id}`);
		console.log(data);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		//Dispatching error, if there is a custom error, fire that one, else use generic error
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.data.message
					: error.message,
		});
	}
};
