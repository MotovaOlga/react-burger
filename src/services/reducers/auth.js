import { 
   REGISTER_SUCCESS, REGISTER_FAILED,
   LOGIN,
   LOGOUT,
	UPDATE_USER,
	GET_USER,
	SET_USER,
   FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
   RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
} from '../actions/types';


const initialState = {
	isLoading: true, // флажок что данные пользователя загрузились. false - значит все давнные загрузились
	isAuth: false, // авторизован? если данные о пользователе есть то true а если нет то false
	user: {
		name:'',
		email:'',
   },
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
	   case REGISTER_SUCCESS:
         console.log('REGISTER_SUCCESS'); //Отладка
			return {
				...state,
				isLoading: false,
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
				isLoading: false,
				isAuth: true,
				user: action.payload.user,
			};

		case LOGOUT:
         console.log('LOGOUT'); //Отладка
			return {
				...initialState,
				isLoading: false,
				// ...state,
				// isLoading: false,
				// isAuth: false,
				// user: {
				// 	name:'',
				// 	email:'',
				// },
			};

		case UPDATE_USER:
         console.log('UPDATE_USER'); //Отладка
			return {
				...state,
				isLoading: false,
				isAuth: true,
				user: action.payload.user,
			};

		// case SET_USER:
		// 	console.log('UPDATE_USER'); //Отладка
		// 	return {
		// 		...state,
		// 		isAuth: true,
		// 		user: action.payload.user,
		// 	};

	   default:
			return state;
	}
};