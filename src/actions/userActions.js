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
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_ADMIN_REQUEST,
	USER_ADMIN_SUCCESS,
	USER_ADMIN_FAIL,
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
		//console.log(userInfo); GETs the entire user details in Database createdAt: "2021-03-16T10:11:06.029Z"
		//email: "jane@example.com";
		//isAdmin: false;
		//name: "Jane Doe";
		//password: "$2a$10$FQVJOoWGREin5tE3XRvRguXGURg0Zi5nVaxI6BNVpGBUouuMeTOJG";
		//updatedAt: "2021-03-16T10:11:06.029Z";
		//__v: 0;
		//_id: "6050843a7d68cf4404a0323e";

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		//isnt this ${id} meant to be profile???
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

//Listing all users for the admin
export const listUsers = () => async (dispatch, getState) => {
	dispatch({ type: USER_LIST_REQUEST });
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
		const { data } = await axios.get("/api/users", config);
		//	console.log(data); The type of data we receive
		//createdAt: "2021-03-16T10:11:06.029Z"
		//email: "jane@example.com"
		//isAdmin: false
		//name: "Jane Doe"
		//password: "$2a$10$FQVJOoWGREin5tE3XRvRguXGURg0Zi5nVaxI6BNVpGBUouuMeTOJG"
		//updatedAt: "2021-03-16T10:11:06.029Z"
		//__v: 0
		//_id: "6050843a7d68cf4404a0323e"
		dispatch({ type: USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_LIST_FAIL, payload: error });
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	dispatch({ type: USER_DELETE_REQUEST });
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
		//no need for data, we just want a successful deletion
		await axios.delete(`/api/users/${id}`, config);

		dispatch({ type: USER_DELETE_SUCCESS });
	} catch (error) {
		dispatch({ type: USER_DELETE_FAIL, payload: error });
	}
};

export const updateUser = (user) => async (dispatch, getState) => {
	dispatch({ type: USER_UPDATE_REQUEST });
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
		// user._id is from the database, user is the object we wanna send to database for updating
		const { data } = await axios.put(`/api/users/${user._id}`, user, config);
		dispatch({ type: USER_UPDATE_SUCCESS });
		//WE ALSO WANNA UPDATE THE USER'S DETAIL WITH THIS INFO
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_UPDATE_FAIL, payload: error });
	}
};

//
export const getUserForAdmin = (id) => async (dispatch, getState) => {
	dispatch({ type: USER_ADMIN_REQUEST });
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
		const { data } = await axios.get(`/api/users/profile/${id}`, config);
		dispatch({ type: USER_ADMIN_SUCCESS, payload: data });
		//dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_ADMIN_FAIL, payload: error });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_LIST_MY_RESET });
	dispatch({ type: CART_ITEM_RESET });
	dispatch({ type: USER_LIST_RESET });
	localStorage.removeItem("userInfo");
	localStorage.removeItem("cartItems");
};
