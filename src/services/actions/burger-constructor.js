// Action Types
import { ADD_INGREDIENT, DELETE_INGREDIENT, SET_INGREDIENT} from './types'

// Action Creators
export const addIngredient = (content) => ({
	type: ADD_INGREDIENT,
	payload: {
		id: 1,
		content,
	}
});

export const deleteIngredient = (id) => ({
	type: DELETE_INGREDIENT,
	payload: id,
}); 

export const setIngredient = (id) => ({
	type: SET_INGREDIENT,
	payload: id,
}); 