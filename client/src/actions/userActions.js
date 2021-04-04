import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		//upon request, client shall make a post request to server api, passing in email and password
		const { data } = await axios.post(
			"/api/users/login",
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data, //user object from server after authenitcation
		});

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		console.log(error);
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGIN_LOGOUT });

	// localStorage.removeItem('cartItems')
	// localStorage.removeItem('shippingAddress')
	// localStorage.removeItem('paymentMethod')
	// dispatch({ type: USER_DETAILS_RESET })
	// dispatch({ type: ORDER_LIST_MY_RESET })
	// dispatch({ type: USER_LIST_RESET })
	// document.location.href = '/login'
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		//upon request, client shall make a post request to server api, passing in email and password
		const { data } = await axios.post(
			"/api/users/",
			{ name, email, password },
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data, //user object from server after authenitcation
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data, //user object from server after authenitcation
		});

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
