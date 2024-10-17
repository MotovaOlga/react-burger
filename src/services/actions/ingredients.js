// Action Types
import { INGREDIENTS_LOADING, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOAD_ERROR } from './types'
import { getIngredientsRequest} from '../../utils/api'



// Action Creators
export const ingredientsRequest = () => async dispatch => {
	dispatch(ingredientsLoading()); // Запускаем процесс загрузки
	try {
	  const response = await getIngredientsRequest(); // Ждём ответа от API
	  dispatch(ingredientsLoadSuccess(response)); // Передаём данные в Redux
	} catch (error) {
	  dispatch(ingredientsLoadError(error)); // Передаём ошибку в Redux
	}
};

export const ingredientsLoading = () => ({
	type: INGREDIENTS_LOADING,
}); 

export const ingredientsLoadSuccess = (ingredients) => ({
	type: INGREDIENTS_LOAD_SUCCESS, // тип действия
	payload: ingredients, // данные, которые будут переданы в редуктор
}); 

export const ingredientsLoadError = (error) => ({
	type: INGREDIENTS_LOAD_ERROR,
	payload: error,
}); 
