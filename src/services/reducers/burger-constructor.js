import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT, SET_INGREDIENT} from '../actions/types'
import data from '../../utils/data'

const initialState = {
	bun: null,
	burgerConstructor: data.products,
	// тут ещё должны быть ключи
};

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
	   case ADD_INGREDIENT:
		   return action.payload.type === 'bun'
            ? { ...state, bun: action.payload }
            : { ...state, ingredients: [...state.ingredients, action.payload] };
		case DELETE_INGREDIENT:
			const index = state.burgerConstructor.findIndex(
				(item) => item._id === action.key
			);
			if (index !== -1) {
			   const updatedBurgerConstructor = [...state.burgerConstructor];
				updatedBurgerConstructor.splice(index, 1);
				return {
				  ...state,
				  burgerConstructor: updatedBurgerConstructor,
				};
			}
			return state;
		case MOVE_INGREDIENT:
			return {
				...state, 
			};
	   default:
			return state;
	}
};