//STEP 2 create a Readucer
//All reducers(from redux) thats related to prodcuts
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from "../constants/userConstants";

// takes in an inital state, and action of any type or action contain some payload.
// at this point proudcts will be an empty array (no proudct yet..)
export const userLoginReducer = (
	state = {
		/* Just empty object to begin with*/
	},
	action
) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }; //Still need to load for crypto
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGIN_LOGOUT:
			return {};
		default:
			return state; //if nothing happens,just return the inital state
	}
};

export const userRegisterReducer = (
	state = {
		/* Just empty object to begin with*/
	},
	action
) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true }; //Still need to load for crypto
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state; //if nothing happens,just return the inital state
	}
};
