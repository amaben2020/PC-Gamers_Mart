import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
} from "./../constants/orderConstants";
import axios from "axios";

//action to be dispatched when an order is created
export const createOrder = (order) => async (dispatch, getState) => {
	dispatch({ type: ORDER_CREATE_REQUEST });
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
		//the order {} object field must have same info with backend
		const { data } = await axios.post(`/api/orders`, order, config);
		console.log("ORDER:", data);
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_CREATE_FAIL, payload: error });
	}
	//where you store the token, username etc
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	//id is the user that placed the order
	dispatch({ type: ORDER_DETAILS_REQUEST });
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
		//the order {} object field must have same info with backend
		const { data } = await axios.get(`/api/orders/${id}`, config);
		console.log("ORDER DETAILS:", data);
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DETAILS_FAIL, payload: error });
	}
	//where you store the token, username etc
};

//Setting up the payOrder action
//The orderId is the id from the order while the paymentResult is what we send to the PayPal API
export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	//id is the user that placed the order that would be sent from f.end to b.end
	dispatch({ type: ORDER_PAY_REQUEST });
	try {
		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();

		//you need Content-Type cos you're sending something fro b.end
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token} `,
			},
		};
		//the order {} object field must have same info with backend
		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		);
		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_PAY_FAIL, payload: error });
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	//id is the user that placed the order that would be sent from f.end to b.end
	dispatch({ type: ORDER_DELIVER_REQUEST });
	try {
		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();

		//you need Content-Type cos you're sending something fro b.end
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token} `,
			},
		};
		//the order {} object field must have same info with backend
		await axios.put(`/api/orders/${order}/deliver`, {}, config);
		dispatch({ type: ORDER_DELIVER_SUCCESS });
	} catch (error) {
		dispatch({ type: ORDER_DELIVER_FAIL, payload: error });
	}
};

export const listMyOrders = () => async (dispatch, getState) => {
	//id is the user that placed the order that would be sent from f.end to b.end
	dispatch({ type: ORDER_LIST_MY_REQUEST });
	try {
		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();

		//you dont need Content-Type cos you're just receiving something fro b.end
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token} `,
			},
		};
		//the order {} object field must have same info with backend
		const { data } = await axios.get(
			`/api/orders/myorders`,

			config
		);
		dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_LIST_MY_FAIL, payload: error });
	}
};

export const listOrders = () => async (dispatch, getState) => {
	//id is the user that placed the order that would be sent from f.end to b.end
	dispatch({ type: ORDER_LIST_REQUEST });
	try {
		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();

		//you dont need Content-Type cos you're just receiving something fro b.end
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token} `,
			},
		};
		//the order {} object field must have same info with backend
		const { data } = await axios.get(
			`/api/orders`,

			config
		);
		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_LIST_FAIL, payload: error });
	}
};
