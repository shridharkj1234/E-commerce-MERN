import axios from 'axios'
 import {
    ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS
} from "../constants/orderConstants";


export const createOrder = (order) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/order/", order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

  } catch (e) {
    dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
  }
};

export const getOrderDetail = (id) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/${id}`, config);
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });

  } catch (e) {
    dispatch({
        type: ORDER_DETAIL_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
  }
};
export const payOrderDetail = (orderId,paymentResult) => async(dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/order/${orderId}/pay`, paymentResult, config);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

  } catch (e) {
    dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
  }
};