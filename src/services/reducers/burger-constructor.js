import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../actions/types'
import data from '../../utils/data'

const initialState = {
	bun: null, //здесь храним булку
	burgerConstructor:  [], //[data.products], //[] - это массив
	// ключи для списка генерировать в момент отрисовки т е в компоненте, (или перетаскивания?) 
};

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
	   case ADD_INGREDIENT:
			console.log('reducer ADD_INGREDIENT');
		   return action.payload.type === 'bun'
            ? { ...state, bun: action.payload }
            : { bun: {name: '', price: 0, image_mobile: ''}, burgerConstructor: [...state.burgerConstructor, action.payload] };

		case DELETE_INGREDIENT:
			console.log('reducer DELETE_INGREDIENT');
			const index = state.burgerConstructor.findIndex(
				(item) => item._id === action.payload // action.key
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