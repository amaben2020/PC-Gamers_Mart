import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_REQUEST,
	USER_DETAILS_FAIL,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_REQUEST,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_DETAILS_RESET,
} from "./../constants/userConstants";
import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import { CART_ITEM_RESET } from "./../constants/cartConstants";
export const login = (email, password) => async (dispatch) => {
	dispatch({ type: USER_LOGIN_REQUEST });
	try {
		const config = {
			headers: {
				"Content-Type": " application/json",
			},
		};
		const { data } = await axios.post("/api/users/login", {
			email,
			password,
			config,
		});

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		console.log(data);
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error });
	}
	//where you store the token, username etc
};

export const register = (name, email, password) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST });
	try {
		const config = {
			headers: {
				"Content-Type": " application/json",
			},
		};
		const { data } = await axios.post("/api/users", {
			name,
			email,
			password,
			config,
		});

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		console.log(data);
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_REGISTER_FAIL, payload: error });
	}
	//where you store the token, username etc
};

//we need to getState cos we need the userInfo (token)
//The id below is just a parameter where we would fill in profile route, this makes us navigate to that route

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		// const userInfo = getState().userLogin.userInfo;

		//getting the userInfo i.e Token from state so you could access the user's profile
		const {
			userLogin: { userInfo },
		} = getState();
		console.log(userInfo);
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/users/${id}`, config);

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_DETAILS_FAIL, payload: error });
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
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
		const { data } = await axios.put(`/api/users/profile`, user, config);

		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error });
	}
	//where you store the token, username etc
};

export const logout = () => (dispatch) => {
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_LIST_MY_RESET });
	dispatch({ type: CART_ITEM_RESET });

	localStorage.removeItem("userInfo");
	localStorage.removeItem("cartItems");
};
