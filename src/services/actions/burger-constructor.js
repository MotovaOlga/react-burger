// Action Types
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from './types'

// Action Creators
export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: ingredient,
});

export const deleteIngredient = (ingredientKey) => ({
	type: DELETE_INGREDIENT,
	payload: ingredientKey,
}); 

export const moveIngredient = (dragIndex, hoverIndex) => ({
	type: MOVE_INGREDIENT,
	payload: {dragIndex, hoverIndex},
	// dragIndex,
	// hoverIndex,
}); 



