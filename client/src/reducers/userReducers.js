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
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_RESET,
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

export const userDetailsReducer = (
	state = {
		user: {
			/* an empty user object */
		},
	},
	action
) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state /* whatever was hold insdie the state, since not every details will be updated */,
				loading: true,
			}; //Still need to load for crypto
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			return { user: {} };
		default:
			return state; //if nothing happens,just return the inital state
	}
};

export const userUpdateProfileReducer = (
	state = {
		/* empty state to begin with, no change, no update */
	},
	action
) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return {
				...state /* whatever was hold insdie the state, since not every details will be updated */,
				loading: true,
			}; //Still need to load for crypto
		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };
		case USER_UPDATE_PROFILE_FAIL:
			return { loading: false, error: action.payload };
		case USER_UPDATE_PROFILE_RESET:
			return {};
		default:
			return state; //if nothing happens,just return the inital state
	}
};
