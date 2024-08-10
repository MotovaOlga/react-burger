// Action Types
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT, SET_INGREDIENT} from './types'

// ингредиентам надо герерировать ключ как только их перетаскиваю в бургер-конструктор
// id не подойдет потому что таких ингрелиентов может быть в бургере несколько штук

// Action Creators
export const addIngredient = (ingredient) => ({
	type: ADD_INGREDIENT,
	payload: {
		key: 1, // ингредиентам надо сгерерировать ключ
		ingredient,
	}
});

export const deleteIngredient = (ingredient) => ({
	type: DELETE_INGREDIENT,
	payload: ingredient,
}); 

export const moveIngredient = (ingredient) => ({
	type: MOVE_INGREDIENT,
	payload: ingredient,
}); 



