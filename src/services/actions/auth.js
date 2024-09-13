// Action Types
import { 
   REGISTER_SUCCESS,
   LOGIN,
   LOGOUT,
	UPDATE_USER,
} from '../actions/types';


// Action Creators
export const registerAction = (user) => ({
	type: REGISTER_SUCCESS,
	payload: { user },
});

export const loginAction = (user) => ({
	type: LOGIN,
	payload: { user },
});
 
export const logoutAction = () => ({
	type: LOGOUT,
});

export const updateUserAction = (user) => ({
	type: UPDATE_USER,
	payload: { user },
});

// isAuth?
// export const checkUserAction = (user) => ({
// 	type: CHECK_USER,
// 	payload: { user },
// });
