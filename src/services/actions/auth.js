// Action Types
import { 
   REGISTER_SUCCESS, REGISTER_FAILED,
   LOGIN,
   LOGOUT,
	UPDATE_USER,
   REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED,
   GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
   UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
   FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
   RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, } from '../actions/types';
import {
	registerRequest,
	loginRequest,
	refreshTokenRequest,
	logoutRequest,
	getUserRequest,
	updateUserRequest, } from '../../utils/api';
// import { useContext, useState, createContext } from 'react';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

// Action Creators
export const registerAction = (user) => ({
	type: REGISTER_SUCCESS,
	payload: { user },
});

export const loginAction = (user) => ({
	type: LOGIN,
	payload: { user },
});
 
export const logoutAction = () => ({
	type: LOGOUT,
});

export const updateUserAction = (user) => ({
	type: UPDATE_USER,
	payload: { user },
});

// isAuth?
// export const checkUserAction = (user) => ({
// 	type: CHECK_USER,
// 	payload: { user },
// });
