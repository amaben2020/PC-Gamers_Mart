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
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_REVIEW_SUCCESS,
	PRODUCT_REVIEW_FAIL,
	PRODUCT_REVIEW_REQUEST,
} from "./../constants/constants";
import axios from "axios";

//This handles every product rendered on the UI
export const productListAction = (keyword = "", pageNumber = "") => async (
	dispatch
) => {
	dispatch({ type: PRODUCT_LIST_REQUEST });

	try {
		//filter the products by inputted words and pagenumber queries
		const { data } = await axios.get(
			`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
		);

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

export const productCreateAction = () => async (dispatch, getState) => {
	//no need for any parameters
	dispatch({ type: PRODUCT_CREATE_REQUEST });
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
		// we just pass a large empty object to create products
		const { data } = await axios.post(`/api/products`, {}, config);
		console.log("created : ", data);
		dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_CREATE_FAIL, payload: error });
	}
};

export const productUpdateAction = (product) => async (dispatch, getState) => {
	//product is what you wanna update
	dispatch({ type: PRODUCT_UPDATE_REQUEST });
	try {
		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token} `,
			},
		};
		// we just pass a large empty object to UPDATE products
		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		);

		dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error });
	}
};

export const createProductReview = (productId, review) => async (
	dispatch,
	getState
) => {
	//product is what you wanna update
	dispatch({ type: PRODUCT_REVIEW_REQUEST });
	try {
		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token} `,
			},
		};
		// we just pass a review object to create review, this serves as body
		await axios.put(`/api/products/${productId}/reviews`, review, config);
		//you dont need a payload, just success if true
		dispatch({ type: PRODUCT_REVIEW_SUCCESS });
	} catch (error) {
		dispatch({ type: PRODUCT_REVIEW_FAIL, payload: error });
	}
};
