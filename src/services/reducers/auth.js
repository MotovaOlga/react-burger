import { 
   REGISTER_SUCCESS, REGISTER_FAILED,
   LOGIN,
   LOGOUT,
	UPDATE_USER,
   REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED,
   GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
   UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
   FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
   RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
} from '../actions/types';
import { getCookie } from '../../utils/cookie';


const initialState = {
	isAuthenticated: false,  // аутентифицирован?
	isAuthorized: !!getCookie('token'), // авторизован?
	user: {
		name:'',
		email:'',
   },
	// token: null, //???
	//isAuthChecked: false, // флажок что проверка закончена и не важно как закончена
	//getUserRequest:false,
	//refreshTokenRequest:false,
	//tokenIsGood:false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
	   case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isAuthorized: !!getCookie('token'),
				user: action.payload.user,
				// token: action.payload.token,
			};

		case REGISTER_FAILED:
			return {... state};

		case LOGIN:
			return {
				...state,
				isAuthenticated: true,
				isAuthorized: !!getCookie('token'),
				user: action.payload.user,
				// token: action.payload.token,
			};

		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				isAuthorized: !!getCookie('token'),
				user: {
					name:'',
					email:'',
				},
				// token: null,
			};

		case UPDATE_USER:
			return {
				...state,
				user: action.payload.user,
			};

		// case GET_USER_REQUEST:
		// 	// return state; 
		// 	return {
		// 		...state,
		// 		getUserRequest : true,
		// 		user: {
		// 			...state.user
		// 		}
		//    }

		// case GET_USER_SUCCESS:
		// 	// return state; 
		// 	return {
		// 		...state,
		// 		getUserRequest : false,
		// 		authorized : true,
		// 		user: {
		// 			name : action?.user?.name,
		// 			email: action?.user?.email,
		// 			password: '',
		// 		}
		//    }

		// case GET_USER_FAILED:
		// 	// return state; 
		// 	return {
		// 		...state,
		// 		getUserRequest : false,
		// 		authorized: false,
		// 		user: {
		// 			name : '',
		// 			email: '',
		// 			password: '',
		// 		}
		//    }

		// case REFRESH_TOKEN_REQUEST:
		// 	// return state; 
		// 	return {
		// 		...state,
		// 		refreshTokenRequest: true,
		// 		tokenIsGood : false
		//    }

		// case REFRESH_TOKEN_SUCCESS:
		// 	// return state; 
		// 	return {
		// 		...state,
		// 		authorized : true,
		// 		refreshTokenRequest: false,
		// 		tokenIsGood : true,
		//    }

		// case REFRESH_TOKEN_FAILED:
		// 	// return state;
		// 	return {
		// 		...state,
		// 		authorized : false,
		// 		refreshTokenRequest: false,
		// 		tokenIsGood : false,
		//    }
			
	   default:
			return state;
	}
};