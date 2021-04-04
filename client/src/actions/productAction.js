//STEP 4 Create Action from constant defined in STEP1
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
import axios from "axios";

//dispatch action using thunk like below:
export const listProducts = () => async (dispatch) => {
	try {
		//list of action take place here
		dispatch({ type: PRODUCT_LIST_REQUEST });

		//same as useEffect previous calls in the product Home Screen
		const { data } = await axios.get("/api/products");

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
				error.reponse && error.reponse.data.message
					? error.reponse.data.message
					: error.message,
		});
	}
};

//Product Details takes in an id that should pass in to axios
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
				error.reponse && error.reponse.data.message
					? error.reponse.data.message
					: error.message,
		});
	}
};
