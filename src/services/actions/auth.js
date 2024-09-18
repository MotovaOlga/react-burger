// Action Types
import { 
   REGISTER_SUCCESS,
   LOGIN,
   LOGOUT,
	UPDATE_USER,
	SET_EMAIL_SUBMITTED,
} from '../actions/types';
import { 
	forgotPasswordRequest, 
	loginRequest, 
	logoutRequest, 
	updateUserRequest, 
	registerRequest, 
} from '../../utils/api';


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

export const setEmailSubmitted = (status) => ({
	type: SET_EMAIL_SUBMITTED,
	payload: status
});

// Все асинхронные функции проекта нужно сделать в виде thunk-функций редакса и объявить их в папке actions, если внутри них используется dispatch
export const fetchForgotPassword = (email) => async (dispatch) => {
	// dispatch(authLoading()); // Запускаем процесс загрузки
	try {
		const data =  await forgotPasswordRequest(email);
		
		// Обработка успешного ответа
		if (data.success) {
			dispatch(setEmailSubmitted(true)); // Устанавливаем, что email был отправлен
		}
	}  catch (error) {
		// dispatch(authLoadError(error)); // Отправляем действие об ошибке
		alert('Что-то пошло не так. Проробуйте еще раз.');
		// console.log('forgotPasswordRequest failed', error); // Отладка
	}
};

export const fetchLogin = (formData) => async (dispatch) => {
	try {
		const data = await loginRequest( formData ); 

		// Обработка успешного ответа
		if (data.success) {
			dispatch(loginAction(data.user));
		}

	} catch (error) {
		// console.log('Login request failed', error);
		alert('Неверные данные. Проробуйте еще раз.');
		// setFormData(emptyState);
	}
};

export const fetchLogout = () => async (dispatch) => {
	try {
		const data = await logoutRequest();
		if (data.success) {
			// Очищаем стор
			dispatch(logoutAction());

			// Навигация на страницу входа
			// navigate('/login'); // Навигация на страницу входа
		}
	} catch (error) {
		alert('Что-то пошло не так. Проробуйте еще раз.');
		// console.log('Logout request failed', error);
	}
};

export const fetchUpdateUser = (newState) => async (dispatch) => {
	try {
		const data = await updateUserRequest(newState);
		// Обработка успешного ответа
		if (data.success) {
			dispatch(updateUserAction(data.user)); 
		}
	} catch (error) {
		// console.log('updateUserRequest failed', error);
		alert('Что-то пошло не так. Проробуйте еще раз.');
	}
};

export const fetchRegister = (formData) => async (dispatch) => {
	try {
		const data = await registerRequest( formData );
		// запишем имя, почту пользователя в стор
		if (data.success) {
			dispatch(registerAction(data.user));
			// если регистрация прошла успешно перенаправить на предыдущую страницу страницу
			// const from = location.state?.from?.pathname || '/';
			// navigate(from, { replace: true });
		}
	} catch (error) {
		// console.log('Register failed', error);
		alert('Что-то пошло не так. Проробуйте еще раз.');
		// setFormData(emptyState);
	}
};



