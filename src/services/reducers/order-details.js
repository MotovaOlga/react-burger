import { ORDER_LOADING, ORDER_LOAD_SUCCESS, ORDER_LOAD_ERROR  } from '../actions/types' 

const initialState = {
	   order: null, 
	   loading: false,
	   error: null,
}
// Пример ответа:
// order: {
// "success": true
//   "name": "Краторный метеоритный бургер",
//   "order": {
//       "number": 6257
//   },
// }

export const orderDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		 case ORDER_LOAD_SUCCESS:
			  return {
					...state,
					order: action.payload,
					loading: false,
					error: null,
			  };
		 case ORDER_LOAD_ERROR:
			  return {
					...state,
					loading: false,
					error: action.payload,
			  };
		//  case ORDER_NUMBER_UPDATE:
		// 	  return {
		// 			...state,
		// 			order: action.payload,
		// 	  };
		  case ORDER_LOADING:
				return {
					...state,
					loading: true,
					error: null
			  };

		 default:
			  return state;
	}
};