// Action Types
import { INGREDIENTS_REQUEST, INGREDIENTS_LOADING, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOAD_ERROR } from './types'
import { getIngredientsRequest} from '../../utils/api'
import {thunk} from 'redux-thunk';


// Action Creators
export const ingredientsRequest = () => async dispatch => {
	dispatch(ingredientsLoading()); // Запускаем процесс загрузки
	try {
	  console.log('response start');
	  const response = await getIngredientsRequest(); // Ждём ответа от API
	  console.log('response end');
	  console.log(response);
	  dispatch(ingredientsLoadSuccess(response)); // Передаём данные в Redux
	} catch (error) {
	  console.log('Error');
	  console.log(error);
	  dispatch(ingredientsLoadError(error)); // Передаём ошибку в Redux
	}
};

export const ingredientsLoading = () => ({
	type: INGREDIENTS_LOADING,
	payload: 'loading',
}); 

export const ingredientsLoadSuccess = (ingredients) => ({
	type: INGREDIENTS_LOAD_SUCCESS, // тип действия
	payload: ingredients, // данные, которые будут переданы в редуктор
}); 

export const ingredientsLoadError = (error) => ({
	type: INGREDIENTS_LOAD_ERROR,
	payload: error,
}); 
