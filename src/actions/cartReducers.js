import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
} from "././../constants/cartConstants";

export const cartReducers = (state = { cartItems: [] }, action = {}) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			//product is data._id in cartActions.js from b.end
			const item = action.payload;
			//existItems simply means get the item that matches the product id (payload)
			const existItem = state.cartItems.find((x) => x.product === item.product); //i.e x._id === action.payload._id

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}

		default:
			return state;
	}
};
