import { INGREDIENTS_REQUEST, INGREDIENTS_LOADING, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOAD_ERROR } from '../actions/types'

//middleware (перехватчик) - перехватывает dispatch до того как он попадет в reducer и выполняет ещё какое-то дополнительное действие.
// чаще всего middleware используются для работы с api
//это тоже самое что и thunk
export const customMiddleware = () => {
	return store => {
		return next => {
			return action => {
				// console.log('store after dispatch', store);
				// console.log('swill dispatch', action);
				// console.log('dispatch', next);
			
				if(typeof action === "function") {
				   // console.log('action-function');
					return action(store.dispatch, store.getState);
				}

				return next(action);
			}
		}
	}
}