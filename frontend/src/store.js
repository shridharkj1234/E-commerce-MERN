import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewCreateReducer, productTopRatedReducer, productUpdateReducer } from './reducer/productReducers';
import { cartReducer } from './reducer/cartReducer';
import {userLoginReducer,userRegisterReducer,userDetailReducer,userListReducer,userUpdateProfileReducer, userDeleteReducer, userUpdateReducer} from './reducer/userLoginReducer';
import {orderCreateReducer,orderDetailReducer,orderPayReducer} from './reducer/orderReducer'
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productTopRated:productTopRatedReducer,
    productReviewCreate:productReviewCreateReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetail:userDetailReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetail:orderDetailReducer,
    orderPay:orderPayReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer

});


const cartItemFromStorage=localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : []
const userInfoFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressStorage=localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const initialState={
    cart:{cartItems:cartItemFromStorage, shippingAddress:shippingAddressStorage},
    userLogin:{userInfo:userInfoFromStorage},
}

const middleware=[thunk];

const store= createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;