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
	// "_id":"60666c42cc7b410027a1a9b1",
	// "name":"Краторная булка N-200i",
	// "type":"bun",
	// "proteins":80,
	// "fat":24,
	// "carbohydrates":53,
	// "calories":420,
	// "price":1255,
	// "image":"https://code.s3.yandex.net/react/code/bun-02.png",
	// "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	// "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
	// "__v":0
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