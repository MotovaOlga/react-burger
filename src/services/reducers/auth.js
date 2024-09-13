import { 
   REGISTER_SUCCESS, 
   LOGIN,
   LOGOUT,
	UPDATE_USER,
} from '../actions/types';

const initialState = {
	isLoading: true, // флажок что данные пользователя загрузились. false - значит все данные загрузились
	isAuth: false, // авторизован? если данные о пользователе есть то true а если нет то false
	user: {
		name:'',
		email:'',
   },
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
	   case REGISTER_SUCCESS:
         // console.log('REGISTER_SUCCESS'); //Отладка
			return {
				...state,
				isLoading: false,
				isAuth: true,
				user: action.payload.user,
			};

		case LOGIN:
         // console.log('LOGIN'); //Отладка
			return {
				...state,
				isLoading: false,
				isAuth: true,
				user: action.payload.user,
			};

		case LOGOUT:
         // console.log('LOGOUT'); //Отладка
			return {
				...initialState,
				isLoading: false,
			};

		case UPDATE_USER:
         // console.log('UPDATE_USER'); //Отладка
			return {
				...state,
				isLoading: false,
				isAuth: true,
				user: action.payload.user,
			};

		// case SET_USER:
		// 	console.log('SET_USER'); //Отладка
		// 	return {
		// 		...state,
		// 		isAuth: true,
		// 		user: action.payload.user,
		// 	};

	   default:
			return state;
	}
};