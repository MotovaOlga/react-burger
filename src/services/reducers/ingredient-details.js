import { ADD_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from '../actions/types'

const initialState = {
	currentIngredient : {
		_id: '',
	   name: '',
	   type: '',
	   proteins: 0,
	   fat: 0,
	   carbohydrates: 0,
	   calories: 0,
	   price: 0,
	   image: '',
	   image_mobile: '',
	   image_large: '',
	   __v: 0,
   }
};

export const ingredientDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CURRENT_INGREDIENT:
			console.log('ADD_CURRENT_INGREDIENT');
			return {
				 ...state,
				 currentIngredient: action.payload,
			};

	  case CLEAR_CURRENT_INGREDIENT:
		   console.log('CLEAR_CURRENT_INGREDIENT');
			return {
				 ...state,
				 currentIngredient: initialState.currentIngredient,
			};

	   default:
			return state;
	}
};