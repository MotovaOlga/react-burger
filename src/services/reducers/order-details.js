import { ORDER_REQUEST, ORDER_LOADING, ORDER_LOAD_SUCCESS, ORDER_LOAD_ERROR, ORDER_NUMBER_UPDATE  } from '../actions/types' 

const initialState = {
	orderDetails: {
		orderIngredients: [],
	   order: null,
	   loading: false,
	   error: null,
}
// response: {
// 	"name": "Краторный метеоритный бургер",
// 	"order": {
// 		 "number": 6257
// 	},
// 	"success": true
//  }
}
export const orderDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		//  case ORDER_REQUEST:
		// 	  return {
		// 			...state,
		// 			loading: true,
		// 			error: null,
		// 	  };
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