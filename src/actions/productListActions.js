import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
} from "./../constants/constants";
import axios from "axios";

export const productListAction = () => async (dispatch) => {
	dispatch({ type: PRODUCT_LIST_REQUEST });

	try {
		const { data } = await axios.get("/api/products");

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

export const productDeleteAction = (productId) => async (
	dispatch,
	getState
) => {
	dispatch({ type: PRODUCT_DELETE_REQUEST });
	try {
		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token} `,
			},
		};
		// user._id is from the database, user is the object we wanna send to database for updating
		await axios.delete(`/api/products/${productId}`, config);
		dispatch({ type: PRODUCT_DELETE_SUCCESS });
		//dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_DELETE_FAIL, payload: error });
	}
};
