// Action Types
import { ADD_CURRENT_INGREDIENT, CLEAR_CURRENT_INGREDIENT } from './types'

// Action Creators
export const addCurrentIngredient = (ingredient) => ({
	type: ADD_CURRENT_INGREDIENT,
	payload: ingredient,
});

export const clearCurrentIngredient = () => ({
	type: CLEAR_CURRENT_INGREDIENT,
}); 
