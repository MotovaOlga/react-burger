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
	isAuthorized: false, // авторизован?

	//isAuthChecked: false, // флажок что проверка закончена и не важно как закончена. тоже самое isLoading. все давнные загрузились
	// если данные о пользователе есть то true а если нет то false. на него опирается protected-route

	user: {
		name:'',
		email:'',
   },

	// token: null, //???
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
				isAuthorized: true,
				user: action.payload.user,
			};

		case REGISTER_FAILED:
			return {... state};

		case LOGIN:
			return {
				...state,
				isAuthenticated: true,
				isAuthorized: true,
				user: action.payload.user,
			};

		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				isAuthorized: false,
				user: {
					name:'',
					email:'',
				},
			};

		case UPDATE_USER:
			return {
				...state,
				user: action.payload.user,
			};

			
	   default:
			return state;
	}
};