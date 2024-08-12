// Action Types
import { ORDER_REQUEST, ORDER_LOADING, ORDER_LOAD_SUCCESS, ORDER_LOAD_ERROR, ORDER_NUMBER_UPDATE  } from './types'
import { getOrderRequest} from '../../utils/api'

//будем передевать массив айдишников

// Action Creators
// Пример ответа:
// {
//   "name": "Краторный метеоритный бургер",
//   "order": {
//       "number": 6257
//   },
//   "success": true
// }

export const orderRequest = (orderIngredients) => async dispatch => {
	dispatch(orderLoading()); // Запускаем процесс загрузки
	try {
	  console.log('response start');
	  const response = await getOrderRequest(orderIngredients); // Ждём ответа от API
	  console.log('response end');
	  console.log('response2: ', response);
	  dispatch(orderLoadSuccess(response)); // Передаём данные в Redux
	} catch (error) {
	  console.log('Error');
	//   console.log(error);
	  dispatch(orderLoadError(error)); // Передаём ошибку в Redux
	}
};

export const orderLoadSuccess = (response) => ({
	type: ORDER_LOAD_SUCCESS, // тип действия
	payload: response, // данные, которые будут переданы в редуктор
}); 

export const orderLoadError = (error) => ({
	type: ORDER_LOAD_ERROR,
	payload: error,
}); 

export const orderLoading = () => ({
	type: ORDER_LOADING,
});
