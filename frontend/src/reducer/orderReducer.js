import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        isLoading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        isLoading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (state = {isLoading:true, orderItems:[],shippingAddress:{}}, action) => {
    switch (action.type) {
      case ORDER_DETAIL_REQUEST:
        return {
            ...state,
          isLoading: true,
        };
      case ORDER_DETAIL_SUCCESS:
        return {
          isLoading: false,
          order: action.payload,
        };
      case ORDER_DETAIL_FAIL:
        return {
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };


export const orderPayReducer = (state = { }, action) => {
    switch (action.type) {
      case ORDER_PAY_REQUEST:
        return {
          isLoading: true,
        };
      case ORDER_PAY_SUCCESS:
        return {
          isLoading: false,
          success:true
        };
      case ORDER_PAY_FAIL:
        return {
          isLoading: false,
          error: action.payload,
        };
      case ORDER_PAY_RESET:
        return{}
      default:
        return state;
    }
  };
