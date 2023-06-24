import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILURE,
} from "../constants/productConstants.js";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload.products, pages:action.payload.pages, page:action.payload.page };

    case PRODUCT_LIST_FAILURE:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: { reviews:[] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, isLoading: true};

    case PRODUCT_DETAIL_SUCCESS:
      return { isLoading: false, product: action.payload };

    case PRODUCT_DETAIL_FAILURE:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = { }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { isLoading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { isLoading: false, success:true};

    case PRODUCT_DELETE_FAILURE:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { isLoading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { isLoading: false, success:true, product:action.payload};

    case PRODUCT_CREATE_FAILURE:
      return { isLoading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {product:{}}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { isLoading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return { isLoading: false, success:true, product:action.payload};

    case PRODUCT_UPDATE_FAILURE:
      return { isLoading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {product:{}}
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { isLoading: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { isLoading: false, success:true, product:action.payload};

    case PRODUCT_CREATE_REVIEW_FAILURE:
      return { isLoading: false, error: action.payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = {products:[]}, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { isLoading: true,products:[] };

    case PRODUCT_TOP_SUCCESS:
      return { isLoading: false, products:action.payload};

    case PRODUCT_TOP_FAILURE:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};


