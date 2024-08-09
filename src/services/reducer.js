import { combineReducers } from "redux";
import { ingredientsReducer } from './reducers/ingredients';
import { burgerConstructorReducer } from './reducers/burger-constructor';
import { orderDetailsReducer } from './reducers/order-details';
import { ingredientDetailsReducer } from './reducers/ingredient-details';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	orderDetails: orderDetailsReducer,
	ingredientDetails: ingredientDetailsReducer,
});


// Форма хранилища такая:
// {
// 	ingredients: {
// 		ingredients: []
// 	},
// 	burgerConstructor: {
// 		burgerConstructor: []
// 	},
// 	orderDetails: {
// 		orderDetails: []
// 	},
//    ingredientDetails: {
// 		ingredientDetails: []
// 	},
// }
