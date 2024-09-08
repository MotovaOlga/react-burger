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

//???
// const fakeAuth = {
//   isAuthenticated: false,
//   signIn(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signOut(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// const AuthContext = createContext(undefined);

// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function useProvideAuth() {
// 	const [user, setUser] = useState(null);
 
// 	const signIn = async form => {
// 	   const data = await loginRequest(form)
// 		   .then(res => {
// 			   let authToken;
// 			   res.headers.forEach(header => {
// 			      if (header.indexOf('Bearer') === 0) {
// 				      authToken = header.split('Bearer ')[1];
// 			      }
// 			   });
// 			   if (authToken) {
// 			     setCookie('token', authToken);
// 			   }
// 			   return res.json();
// 		   })
// 		   .then(data => data);
 
// 	      if (data.success) {
// 		      setUser({ ...data.user, id: data.user._id });
// 	      }
// 	};

// export function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   const signIn = async form => {
// 	return loginRequest(form)
// 	   .then((res) => {
// 	   	if (res && res.success) {
// 	   		 const authToken = res.accessToken.split('Bearer ')[1];
// 	   		//  const refreshToken = res.refreshToken;
// 	   		//  console.log('loginAction ok');
// 	   		 setCookie('token', authToken);
// 	   		//  localStorage.setItem('refreshToken', refreshToken);
// 	   		//  dispatch({
// 	   		// 	  type: LOGIN,
// 	   		// 	  user: res.user,
// 	   		//  });
// 	   		 return res;
// 	   	} else {
// 	   		 console.error(res.message)
   
// 	   	}
//       })
//          .catch((err) => {
// 	       	console.error('Error1: ', err);
//       });

//    const signOut = cb => {
//       return fakeAuth.signOut(() => {
//          setUser(null)
//          cb();
//       });
//    };

//   return {
//     user,
//     signIn,
//     signOut
//   };
// }

// export const registerAction = (state) => {
// 	return function (dispatch) {
// 		 console.log('registerAction');
// 		 registerRequest(state)
// 			  .then((res) => {
// 					if (res && res.success) {
// 						 const authToken = res.accessToken.split('Bearer ')[1];
// 						 const refreshToken = res.refreshToken;
// 						 setCookie('token', authToken);
// 						 localStorage.setItem('refreshToken', refreshToken);
// 						 dispatch({
// 							  type: REGISTER_SUCCESS,
// 							  user: res.user,
// 						 });

// 					} else {
// 						 dispatch({
// 							  type: REGISTER_FAILED,
// 						 });
// 					}
// 			  })
// 			  .catch((err) => {
// 					console.log(err);
// 					dispatch({
// 						 type: REGISTER_FAILED,
// 					});
// 			  });
// 	}
// }

// export const loginAction = (state) => {
// 	console.log('loginAction');
// 	dispatch({ type: AUTH_REQUEST });
// 	return loginRequest(state);
// //	return function (dispatch) {
// //		 console.log('loginAction');
// //		 return loginRequest(state)
// //			  .then((res) => {
// //					if (res && res.success) {
// //						 const authToken = res.accessToken.split('Bearer ')[1];
// //						 const refreshToken = res.refreshToken;
// //						 console.log('loginAction ok');
// //						 setCookie('token', authToken);
// //						 localStorage.setItem('refreshToken', refreshToken);
// //						 dispatch({
// //							  type: LOGIN_SUCCESS,
// //							  user: res.user,
// //						 });
// //						 return res;
// //					} else {
// //						 console.error(res.message)
// //
// //					}
// //			  })
// //			  .catch((err) => {
// //					console.error('Error1: ', err);
// //			  });
// //	};
// };

// export const refreshTokenAction = () => {
// 	return function (dispatch) {
// 		 dispatch({
// 			  type: REFRESH_TOKEN_REQUEST
// 		 });
// 		 console.log('refreshTokenAction')
// 		 refreshTokenRequest()
// 			  .then((res) => {
// 			  if (res && res.success) {
// 					localStorage.setItem('refreshToken', res.refreshToken);
// 					const authToken = res.accessToken.split('Bearer ')[1];
// 					deleteCookie('token')
// 					setCookie('token', authToken);
// 					dispatch({
// 						 type: REFRESH_TOKEN_SUCCESS
// 					});
// 			  }
// 		 })
// 		 .catch((err) => {
// 			  dispatch({
// 					type: REFRESH_TOKEN_FAILED
// 			  });
// 			  console.error('Error2: ', err);
// 		 });
// 	};
// }

// export const logoutAction = () => {
// 	return function (dispatch) {
// 		 logoutRequest()
// 			  .then((res) => {
// 					if (res && res.success) {
// 						 deleteCookie('token');
// 						 localStorage.removeItem('refreshToken');
// 						 dispatch({
// 							  type:  LOGOUT_SUCCESS,
// 						 });
// 						 return true;
// 					}
// 			  })
// 			  .catch((err) => {
// 					console.error('Error: ', err);
// 			  });
// 	};
// };

// export const getUserAction = () => {
// 	return function (dispatch) {
// 		 console.log('getUserAction: '+getCookie('token'))
// 		 dispatch({
// 			  type:
// 			  GET_USER_REQUEST
// 		 });
// 		 return getUserRequest(getCookie('token'))
// 			  .then((res) => {
// 					if (res && res.success) {
// 						 dispatch({
// 							  type: GET_USER_SUCCESS,
// 							  user: res.user,
// 						 });
// 					}
// 			  })
// 			  .catch((err) => {
// 					console.log('Error3: ');
// 					console.log(err)
// 					dispatch({
// 						 type: GET_USER_FAILED
// 					});
// 					dispatch({
// 						 type: REFRESH_TOKEN_REQUEST,
// 					});
// 			  });
// 	};
// };
// export const updateUserAction = (state) => {
// 	console.log('-=updateUserAction=-');
// 	return function (dispatch) {
// 		 dispatch({
// 			  type: GET_USER_REQUEST
// 		 });
// 		 updateUserRequest({
// 						 email : state.email,
// 						 name : state.name,
// 						 token : getCookie('token')})
// 			  .then((res) => {
// 					if (res && res.success) {
// 						 dispatch({
// 							  type: GET_USER_SUCCESS,
// 							  user: res.user,
// 						 });
// 					} else {
// 						 dispatch({
// 							  type: GET_USER_FAILED,
// 						 });
// 					}
// 			  })
// 			  .catch((err) => {
// 					dispatch({
// 						 type: GET_USER_FAILED,
// 					});
// 			  });
// 	}
// };