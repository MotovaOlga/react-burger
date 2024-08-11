// Action Types
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from './types'

// ингредиентам надо герерировать ключ как только их перетаскиваю в бургер-конструктор
// id не подойдет потому что таких ингрелиентов может быть в бургере несколько штук

// Action Creators
export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: ingredient,
});

export const deleteIngredient = (ingredientId) => ({
	type: DELETE_INGREDIENT,
	payload: ingredientId,
}); 

export const moveIngredient = (dragIndex, hoverIndex) => ({
	type: MOVE_INGREDIENT,
	dragIndex,
	hoverIndex,
}); 



