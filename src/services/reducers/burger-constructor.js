import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../actions/types'
import data from '../../utils/data'

const initialState = {
	bun: null, //здесь храним булку
	burgerConstructor:  [], //[data.products], //[] - это массив
};

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
	   case ADD_INGREDIENT:
			console.log('reducer ADD_INGREDIENT');
		   return action.payload.type === 'bun'
            ? { ...state, bun: action.payload, burgerConstructor: state.burgerConstructor }
            : { ...state, bun: state.bun, burgerConstructor: [...state.burgerConstructor, action.payload] };

		case DELETE_INGREDIENT:
			console.log('reducer DELETE_INGREDIENT');
			const index = state.burgerConstructor.findIndex(
				(item) => item.key === action.payload // action.key
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
			console.log('reducer MOVE_INGREDIENT');
			// console.log('action.payload', action.payload);
			const { dragIndex, hoverIndex } = action.payload; // console.log('dragIndex, hoverIndex', dragIndex, hoverIndex);
			const updatedIngredientsMove = [...state.burgerConstructor]; // Создание копии массива ингредиентов
			const draggedItem = updatedIngredientsMove[dragIndex]; // console.log('draggedItem', draggedItem);// Извлечение перетаскиваемого элемента
			updatedIngredientsMove.splice(dragIndex, 1); // Удаление перетаскиваемого элемента из его начального положения
			// console.log('updatedIngredientsMove1', updatedIngredientsMove );
			updatedIngredientsMove.splice(hoverIndex, 0, draggedItem); //Вставка перетаскиваемого элемента в новое положение
			// console.log('updatedIngredientsMove2', updatedIngredientsMove );
			return {
				...state, 
				burgerConstructor: updatedIngredientsMove,				
			};

	   default:
			return state;
	}
};