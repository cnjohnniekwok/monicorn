//STEP 4 Create Action from constant defined in STEP1
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
} from "../constants/productConstants";
import axios from "axios";

//dispatch action using thunk like below:
export const listProducts = (keyword = "", pageNumber = "") => async (
	dispatch
) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_LIST_REQUEST });

		//same as useEffect previous calls in the product Home Screen
		const { data } = await axios.get(
			`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
		);

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			// getting server error and put it into client state
			// check generic error message error.respone and if our custom error message from the error handler middleware existed, use that instead.
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listTopProducts = () => async (dispatch) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_TOP_REQUEST });

		//same as useEffect previous calls in the product Home Screen
		const { data } = await axios.get("/api/products/top");
		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_TOP_FAIL,
			// getting server error and put it into client state
			// check generic error message error.respone and if our custom error message from the error handler middleware existed, use that instead.
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		//same as useEffect previous calls in the product Home Screen
		const { data } = await axios.get(`/api/products/${id}`);

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			// getting server error and put it into client state
			// check generic error message error.respone and if our custom error message from the error handler middleware existed, use that instead.
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState(); //destructuring getState().userLogin.userInfo from store intialState

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`, //passing token in header using Bearer Token
			},
		};

		//same as useEffect previous calls in the product Home Screen
		const { data } = await axios.post(`/api/products/`, {}, config);

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			// getting server error and put it into client state
			// check generic error message error.respone and if our custom error message from the error handler middleware existed, use that instead.
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState(); //destructuring getState().userLogin.userInfo from store intialState

		const config = {
			headers: {
				"Content-Tpye": "application/json",
				Authorization: `Bearer ${userInfo.token}`, //passing token in header using Bearer Token
			},
		};

		//same as useEffect previous calls in the product Home Screen
		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		);

		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			// getting server error and put it into client state
			// check generic error message error.respone and if our custom error message from the error handler middleware existed, use that instead.
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//Product Details takes in an id that should pass in to axios
export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState(); //destructuring getState().userLogin.userInfo from store intialState

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`, //passing token in header using Bearer Token
			},
		};

		//same as useEffect previous calls in the product Home Screen
		await axios.delete(`/api/products/${id}`, config);

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			// getting server error and put it into client state
			// check generic error message error.respone and if our custom error message from the error handler middleware existed, use that instead.
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProductReview = (productId, review) => async (
	dispatch,
	getState
) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState(); //destructuring getState().userLogin.userInfo from store intialState

		const config = {
			headers: {
				"Content-Tpye": "application/json",
				Authorization: `Bearer ${userInfo.token}`, //passing token in header using Bearer Token
			},
		};

		//same as useEffect previous calls in the product Home Screen
		await axios.post(`/api/products/${productId}/reviews`, review, config);

		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			// getting server error and put it into client state
			// check generic error message error.respone and if our custom error message from the error handler middleware existed, use that instead.
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
