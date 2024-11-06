import { rootReducer } from './reducer';
import { createStore, applyMiddleware } from 'redux';
// import data from '../utils/data';
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';

// // данные, которыми инициализируется хранилище
// // лучше это делать в редьюсерах
// export const initialState = {
// 	ingredients: {
// 		// ingredients: [...data.products],
// 		ingredients: [],
// 		loading: false,
// 	   error: null
// 	},
// 	burgerConstructor: {
//    bun: null,
// 		burgerConstructor: [],
// 	},
// 	orderDetails: {
// 		orderDetails: [],
// 	},
//    ingredientDetails: {
// 		ingredientDetails: [],
// 	},
//    auth: {
// 
//    },
// }

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
)

// export type AppDispatch = typeof store.dispatch;