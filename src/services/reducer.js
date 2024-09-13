import { combineReducers } from "redux";
import { ingredientsReducer } from './reducers/ingredients';
import { burgerConstructorReducer } from './reducers/burger-constructor';
import { orderDetailsReducer } from './reducers/order-details';
import { ingredientDetailsReducer } from './reducers/ingredient-details';
import { authReducer } from './reducers/auth';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	orderDetails: orderDetailsReducer,
	ingredientDetails: ingredientDetailsReducer,
	auth: authReducer,
});


// Форма хранилища такая:
// {
// 	ingredients: {
// 		ingredients: []
// 	},
// 	burgerConstructor: {
//       bun: null, //здесь храним булку
// 		burgerConstructor: []
// 	},
// 	orderDetails: {
// 		order: []
// 	},
//    ingredientDetails: {
// 		currentIngredient: []
// 	},
//    auth: {
//       isLoading: true, // флажок что данные пользователя загрузились. false - значит все давнные загрузились
//       isAuth: false, // авторизован? если данные о пользователе есть то true а если нет то false
//       user: {
//       	name:'',
//       	email:'',
//       },
//    },
// }
