import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from "./../constants/userConstants";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
	dispatch({ type: USER_LOGIN_REQUEST });

	try {
		const config = {
			headers: {
				"Content-Type": " application/json",
			},
		};
		const { data } = await axios.get("/api/users");

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		console.log(data);
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error });
	}
	//where you store the token, username etc
	localStorage.setItem("userInfo", JSON.stringify(data));
};
