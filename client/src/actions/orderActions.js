import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELETE_REQUEST,
	ORDER_DELETE_SUCCESS,
	ORDER_DELETE_FAIL,
	ORDER_MYORDERS_REQUEST,
	ORDER_MYORDERS_SUCCESS,
	ORDER_MYORDERS_FAIL,
} from "../constants/orderConstants";
import axios from "axios";
import { CART_ITEM_RESET } from "../constants/cartConstants";
import { logout } from "./userActions";

export const createOrder = (order) => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		//Send Authorization token in header to get pass protect auth middleware
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/orders`, order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});

		dispatch({
			type: CART_ITEM_RESET,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (id) => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});

		//Send Authorization token in header to get pass protect auth middleware
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});

		dispatch(listMyOrders()); //backgroud update profile order list
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		});

		//Send Authorization token in header to get pass protect auth middleware
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		);

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/orders/${order._id}/deliver`,
			{},
			config
		);

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			dispatch(logout());
		}
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: message,
		});
	}
};

export const deleteOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/orders/${order._id}`, config);

		dispatch({
			type: ORDER_DELETE_SUCCESS,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized, token failed") {
			dispatch(logout());
		}
		dispatch({
			type: ORDER_DELETE_FAIL,
			payload: message,
		});
	}
};

export const listMyOrders = () => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: ORDER_MYORDERS_REQUEST,
		});

		//Send Authorization token in header to get pass protect auth middleware
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/myorders`, config);

		dispatch({
			type: ORDER_MYORDERS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_MYORDERS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listAllOrders = () => async (
	dispatch,
	getState /* need to send a token as well getState.userInfo has our token in it*/
) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		});

		//Send Authorization token in header to get pass protect auth middleware
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/`, config);

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
