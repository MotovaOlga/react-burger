// Action Types
import { ORDER_LOADING, ORDER_LOAD_SUCCESS, ORDER_LOAD_ERROR  } from './types'
import { getOrderRequest} from '../../utils/api'
import { clearIngredients} from '../actions/burger-constructor'

//будем передевать массив айдишников

// Action Creators
// Пример ответа:
// order: {
// "success": true
//   "name": "Краторный метеоритный бургер",
//   "order": {
//       "number": 6257
//   },
// }


export const orderRequest = (orderIngredients) => async dispatch => {
	dispatch(orderLoading()); // Запускаем процесс загрузки
	try {
		const response = await getOrderRequest(orderIngredients); // Ждём ответа от API
		dispatch(orderLoadSuccess(response)); // Передаём данные в Redux
		// console.log('response ', response);
		if(response.success) {
			// console.log('orderClear');
			dispatch(clearIngredients()); // Очищаем бургер конструктор после того как заказ отправлен
		}
	}  catch (error) {
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

