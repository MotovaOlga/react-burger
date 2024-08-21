import { INGREDIENTS_REQUEST, INGREDIENTS_LOADING, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOAD_ERROR } from '../actions/types'
// import data from '../../utils/data';

// данные, которыми инициализируется хранилище
// const initialState = {
// 		ingredients: [...data.products],
// 		loading: false,
// 	   error: null
// };
const initialState = {
	ingredients: [],
	loading: false,
	error: null
};
 
export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
	   case INGREDIENTS_LOAD_SUCCESS:
		   return {
			   ...state,
			   ingredients: action.payload,
			   loading: false,
		   };
	   case INGREDIENTS_LOAD_ERROR:
		   return {
			   ...state,
			   loading: false,
			   error: action.payload
		   };
		case INGREDIENTS_LOADING:
		   return {
			   ...state,
			   loading: true,
				error: null
		 };
	   default:
			return state;
	}
 };
 