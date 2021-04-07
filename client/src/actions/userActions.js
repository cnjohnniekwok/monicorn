import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
} from "../constants/userConstants";
import { ORDER_MYORDERS_RESET } from "../constants/orderConstants";
import { useEffect } from "react";

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

		//upon request, client shall make a POST request to server api, passing in email and password
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
	dispatch({ type: USER_DETAILS_RESET }); //call the const on logout to reset profile
	dispatch({ type: ORDER_MYORDERS_RESET }); //call the const on logout to reset profile
	dispatch({ type: USER_LIST_RESET });
	// localStorage.removeItem('cartItems')
	// localStorage.removeItem('shippingAddress')
	// localStorage.removeItem('paymentMethod')

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

		//upon request, client shall make a POST request to server api, passing in email and password
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

// Passing in user ID only
export const getUserDetails = (id) => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState(); //destructuring getState().userLogin.userInfo from store intialState

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`, //passing token in header using Bearer Token
			},
		};

		const { data } = await axios.get(
			`/api/users/${id}`, //get user profile with GET user server api
			config
		);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Passing in an user Object
export const updateUserProfile = (user) => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState(); //destructuring getState().userLogin.userInfo from store intialState

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`, //passing token in header using Bearer Token
			},
		};

		const { data } = await axios.put(
			`/api/users/profile`,
			user, //update user profile with PUT update user server api
			config
		);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});

		//update nav bar username to current updated one
		//-------------------------------------------------------|
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem("userInfo", JSON.stringify(data));
		//-------------------------------------------------------|
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listUsersProfile = () => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState(); //destructuring getState().userLogin.userInfo from store intialState

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`, //passing token in header using Bearer Token
			},
		};

		const { data } = await axios.get(`/api/users/`, config);

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
