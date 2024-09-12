import { 
   REGISTER_SUCCESS, REGISTER_FAILED,
   LOGIN,
   LOGOUT,
	UPDATE_USER,
	GET_USER,
   REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED,
   FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
   RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
} from '../actions/types';
import { getCookie } from '../../utils/cookie';


const initialState = {
	// isAuthenticated: false,  // аутентифицирован?
	// isAuthorized: false, // авторизован?
	isAuth: false, // авторизован? если данные о пользователе есть то true а если нет то false. на него опирается protected-route
	//isAuthChecked: false, // флажок что проверка закончена и не важно как закончена. тоже самое isLoading. все давнные загрузились

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
         console.log('REGISTER_SUCCESS'); //Отладка
			return {
				...state,
				// isAuthenticated: true,
				// isAuthorized: true,
				isAuth: true,
				user: action.payload.user,
			};

		case REGISTER_FAILED:
         console.log('REGISTER_FAILED'); //Отладка
			return {... state};

		case LOGIN:
         console.log('LOGIN'); //Отладка
			return {
				...state,
				// isAuthenticated: true,
				// isAuthorized: true,
				isAuth: true,
				user: action.payload.user,
			};

		case LOGOUT:
         console.log('LOGOUT'); //Отладка
			return {
				...state,
				// isAuthenticated: false,
				// isAuthorized: false,
				isAuth: false,
				user: {
					name:'',
					email:'',
				},
			};

		case UPDATE_USER:
         console.log('UPDATE_USER'); //Отладка
			return {
				...state,
				isAuth: true,
				user: action.payload.user,
			};

		// case GET_USER:
		// 	console.log('GET_USER'); //Отладка
		// 	return {
		// 		...state,
		// 		// isAuthenticated: true,
		// 		// isAuthorized: true,
		// 		isAuth: true,
		// 		user: action.payload.user,
		// 	};
			
	   default:
			return state;
	}
};