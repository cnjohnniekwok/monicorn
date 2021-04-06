//STEP 3 addin the Reducer object: Reducer
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; //this is the Middleware apply for redux
import { composeWithDevTools } from "redux-devtools-extension"; // from browser redux DevTools to understands
import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/productReducers";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
} from "./reducers/orderReducers";
import { cartReducer } from "./reducers/cartReducers";

//bring in each reducer created from reducers folder
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	cart: cartReducer,
});

//If localStorage has 'cartItems' stores in it, get it to cartItemsFromStorage, parse the string to JSON *since we store it as stringty JSON*
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

//same idea as cartItems
const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

//same idea as cartItems
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

//same idea as cartItems
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: {};

const initialState = {
	//cart init state is defined above and it get update from localStorage 'cartItems' state
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}; //to store usertoken, cartitems

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
); // create store for redux

export default store;
