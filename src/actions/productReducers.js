import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	PRODUCT_DELETE_RESET,
	PRODUCT_REVIEW_REQUEST,
	PRODUCT_REVIEW_SUCCESS,
	PRODUCT_REVIEW_FAIL,
	PRODUCT_REVIEW_RESET,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
	PRODUCT_TOP_REQUEST,
} from "./../constants/constants";
const productDetailsState = {
	product: {},
	review: [],
};
export const productListReducer = (state = { products: [] }, action = {}) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				//remember the 3 res.json from the backend? res.json({ products, page, pages: Math.ceil(count / pageSize) });
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case PRODUCT_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const topRatedProductReducer = (
	state = { products: [] },
	action = {}
) => {
	switch (action.type) {
		case PRODUCT_TOP_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case PRODUCT_TOP_SUCCESS:
			return {
				loading: false,
				//remember the 3 res.json from the backend? res.json({ products, page, pages: Math.ceil(count / pageSize) });
				products: action.payload,
			};
		case PRODUCT_TOP_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (
	state = productDetailsState,
	action = {}
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const productDeleteReducer = (
	state = productDetailsState,
	action = {}
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				success: true, //same as message from backend
			};
		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case PRODUCT_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

export const productCreateReducer = (state = { product: {} }, action = {}) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_CREATE_SUCCESS:
			return {
				loading: false,
				product: action.payload,
				success: true, //same as message from backend
			};
		case PRODUCT_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const productUpdateReducer = (state = { product: {} }, action = {}) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_CREATE_SUCCESS:
			return {
				loading: false,
				product: action.payload,
				success: true, //same as message from backend
			};
		case PRODUCT_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const productReviewCreateReducer = (state = {}, action = {}) => {
	switch (action.type) {
		case PRODUCT_REVIEW_REQUEST:
			return {
				loading: true,
			};
		case PRODUCT_REVIEW_SUCCESS:
			return {
				loading: false,

				success: true, //same as message from backend
			};
		case PRODUCT_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case PRODUCT_REVIEW_RESET:
			return {}; //REMOVE EVERYTHING FROM THE STATE
		default:
			return state;
	}
};
