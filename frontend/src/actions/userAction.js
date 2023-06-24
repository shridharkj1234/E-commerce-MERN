const axios = require("axios");
const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAILURE,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_RESET,
} = require("../constants/userLoginConstants");

export const login = (email,password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }


    const { data } = await axios.post("api/user/login",{email,password},config);
  
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo',JSON.stringify(data))
    
  } catch (e) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const logout=()=>(dispatch)=>{
  localStorage.removeItem('userInfo');
  window.location='/';
  dispatch({type:USER_LOGOUT})
  dispatch({type:USER_LIST_RESET})
}

export const register = (name,email,password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }


    const { data } = await axios.post("api/user/",{name,email,password},config);
  
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo',JSON.stringify(data))
    
  } catch (e) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const getUserDetail = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {userLogin:{userInfo}}=getState();
    console.log(userInfo.token);
    const config={
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/user/${id}`, config)
    console.log(data);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

  } catch (e) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch,getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const {userLogin:{userInfo}}=getState();
    const config={
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/user/profile`, user,config)

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

  } catch (e) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const listUser = () => async (dispatch,getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {userLogin:{userInfo}}=getState();

    const config={
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/user`, config)
    dispatch({ type: USER_LIST_SUCCESS, payload: data });

  } catch (e) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const {userLogin:{userInfo}}=getState();

    const config={
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.delete(`/api/user/${id}`, config)
    dispatch({ type: USER_DELETE_SUCCESS });

  } catch (e) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/user/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    dispatch({ type: USER_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}