import axios from "axios";
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

//getState allow us to access the entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	//getState().[reducer:cart].[cartReducer:cartItems<--state]
	//This kept the item at local storage, so even if user refreshes. the next time they come back, it will still hold in side the cart.
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); //localStorage can only save string, therefore, need to stringify the results
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (formData) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: formData,
	});

	localStorage.setItem("shippingAddress", JSON.stringify(formData));
};

export const savePaymentMethod = (formData) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: formData,
	});

	localStorage.setItem("paymentMethod", JSON.stringify(formData));
};
