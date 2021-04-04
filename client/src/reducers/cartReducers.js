import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// reduser = ( initalState={what(any objects) should be inside this state}, overall that hold many types)
export const cartReducer = (state = { cartItems: [] }, action) => {
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

		default:
			return state;
	}
};
