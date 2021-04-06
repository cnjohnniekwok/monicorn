import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

// reduser = ( initalState={what(any objects) should be inside this state}, overall that hold many types)
export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload; //new item cames in to cart

			//check if item selected already inside the cart
			// state.cartItems <-- current items in the cart
			// x eachItems in the cart
			const existItem = state.cartItems.find((eachItemInCart) => {
				return eachItemInCart.product === item.product; //if ID matches
			});

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((eachItemInCart) => {
						if (eachItemInCart.product === existItem.product) {
							return item;
						} else {
							return eachItemInCart;
						}
					}),
				};
			} else {
				//if item does not exist, just push into the cartItem array
				return {
					...state, //state = same as whatever in the current state
					cartItems: [...state.cartItems, item], //cart items = whatever inside + new items
				};
			}

		case CART_REMOVE_ITEM:
			return {
				...state,
				//filter out whatever product ID in the cartItems thats not equal to action payload. payload is going to be just an id passes it
				cartItems: state.cartItems.filter(
					(eachItemInCart) => eachItemInCart.product !== action.payload
				),
			};

		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				//filter out whatever product ID in the cartItems thats not equal to action payload. payload is going to be just an id passes it
				shippingAddress: action.payload, // data that pass in from the shippingscreen form
			};

		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				//filter out whatever product ID in the cartItems thats not equal to action payload. payload is going to be just an id passes it
				paymentMethod: action.payload, // data that pass in from the shippingscreen form
			};
		default:
			return state;
	}
};
