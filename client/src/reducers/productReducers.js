//STEP 2 create a Readucer
//All reducers(from redux) thats related to prodcuts
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

// takes in an inital state, and action of any type or action contain some payload.
// at this point proudcts will be an empty array (no proudct yet..)
export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			//when action is a request, it should be loading (true) and nothing is inside the products array
			return { loading: true, products: [] };
		case PRODUCT_LIST_SUCCESS:
			//once the request is completed successfully. loading should be ended (false) and products will contains the return of some action payload
			return { loading: false, products: action.payload };
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state; //if nothing happens,just return the inital state
	}
};

//Only one product and it has reviews
export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			//when action is a request, it should be loading (true) and nothing is inside the products array
			return { loading: true, ...state };
		case PRODUCT_DETAILS_SUCCESS:
			//once the request is completed successfully. loading should be ended (false) and products will contains the return of some action payload
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state; //if nothing happens,just return the inital state
	}
};