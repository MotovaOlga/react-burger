// api config
const apiConfig = {
   // Константа для URL-адреса домена
	baseUrl: "https://norma.nomoreparties.space/api",
};

// функция которая обрабатывает-проверяет ответ
const getResponse = (response) => {
	// console.log('getResponse - response: ', response); //Отладка
	return (response.ok) ? response.json() : Promise.reject(`Error ${response.status}`);
};


// запрос ингредиентов
export const getIngredientsRequest = async () => {
	const url = `${apiConfig.baseUrl}/ingredients`;
	try {
		// Выполняем запрос и получаем полный ответ
		const response = await fetch(url);
		// Обрабатываем ответ
		const data = await getResponse(response);
		// Извлекаем массив data из полученного объекта
		return data.data; // Предполагаем, что массив ингредиентов находится в поле data
	} catch (error) {
		throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	}
};

// запрос номера заказа
export const getOrderRequest = async (orderData) => {
	const url = `${apiConfig.baseUrl}/orders`;
	try {
		// Выполняем запрос и получаем полный ответ
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(orderData),
		});
		// Обрабатываем ответ
		const data = await getResponse(response);
		return data;
	} catch (error) {
		//  throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
		return Promise.reject(error);
	}
};

// POST https://norma.nomoreparties.space/api/password-reset- эндпоинт для /forgot-password.
// POST https://norma.nomoreparties.space/api/password-reset/reset - эндпоинт для /reset-password 
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена. 
// GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
// PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.

// export const registerRequest, !!!
// export const loginRequest, !!!
// export const logoutRequest, !!!
// export const refreshTokenRequest, !!!
// export const fetchWithRefreshToken !!!
// export const getUserRequest, !!!
// export const updateUserRequest, !!!
// export const forgotPasswordRequest, !!!
// export const resetPasswordRequest, !!!


//formData = {"email": "", "password": "", "name": "" }
export const registerRequest = async (formData) => {
	const url = `${apiConfig.baseUrl}/auth/register`;

	try {
		return await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				 'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(formData),
	   })
		.then(getResponse)
		.then((data) => {
			if(data.success) {
		      let accessToken = data.accessToken.split('Bearer ')[1];
				let refreshToken = data.refreshToken;
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
			}
			return data;
		});
	} catch (error) {
		throw new Error(`Error ${error.status}`);
	} 
};

export const loginRequest = async ({ email, password }) => { 
	const url = `${apiConfig.baseUrl}/auth/login`;

	try {
		return await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
			  'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({email, password})
		})
		.then(getResponse)
		.then((data) => {
			if(data.success) {
		      let accessToken = data.accessToken.split('Bearer ')[1];
				let refreshToken = data.refreshToken;
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
			}
			return data;
		});
	} catch (error) {
		throw new Error(`Error ${error.status}`);
	} 

};

// Для выхода из системы передайте в теле запроса значение refreshToken
export const logoutRequest = async () => {
	const url = `${apiConfig.baseUrl}/auth/logout`;

	try {
		return await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken')
			}),
	   })
	   .then(getResponse)
	   .then((data) => {
		   if (data.success) {
		   	// очищаем local storage
		   	localStorage.removeItem('accessToken');
		   	localStorage.removeItem('refreshToken');
		   }
		   return data;
	   });
	} catch (error) {
		throw new Error(`Error ${error.status}`);
	} 
};

// отправляю refreshToken и получаю 2 новых токена: refreshToken и accessToken
export const refreshTokenRequest = async () => {
	const url = `${apiConfig.baseUrl}/auth/token`;

	try {
			return await fetch(url, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({
				  token : localStorage.getItem('refreshToken') || ''
				}),
			})
			.then(getResponse)
			.then((refreshData) => {
				if(refreshData.success) {
			      let accessToken = refreshData.accessToken.split('Bearer ')[1];
					let refreshToken = refreshData.refreshToken;
					localStorage.setItem('accessToken', accessToken);
					localStorage.setItem('refreshToken', refreshToken);
				} 
				return refreshData;
			});
	} catch (error) {
		throw new Error(`Error ${error.status}`);
	} 
};

// если токена вообще нет то считаем что пользователь не авторизован
export const fetchWithRefreshToken = async (url, options) => {
	try {
		const response = await fetch(url, options);
	   if (!response.ok) {
			throw new Error(`Error ${response.status}`);
      }
		return await getResponse(response);
	} catch (error) {
		// Если сервер возвращает ошибку 403, это может указывать на то, что токен истек или недостаточно прав для выполнения запроса.
		if (error.message.includes('Error 403')) {
			try {
				const refreshData = await refreshTokenRequest();
				
				if (!refreshData.success) {
				  return Promise.reject(refreshData);
				}
				const response = await fetch(url, options);
		      return await getResponse(response);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
	  } else {
			return Promise.reject(error);
	  }
	} 
};

// Сервер вернёт такой ответ: {"success": true, "user": { "email": "", "name": "" }} 
export const getUserRequest = async () => {
	const url = `${apiConfig.baseUrl}/auth/user`;
	const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
   const options = {
	   method: 'GET',
	   headers: {
	   	'Content-Type': 'application/json',
	   	'Authorization': accessToken,
	   },
	};
	const response = await fetchWithRefreshToken(url, options);
	return response;
};

// сервер вернёт обновлённого пользователя: {"success": true, "user": { "email": "", "name": "" }}
export const updateUserRequest = async (newFormData) => { //({name, email, password}) => {
	const url = `${apiConfig.baseUrl}/auth/user`;
	const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
   const options = {
	   method: 'PATCH',
	   headers: {
	   	'Content-Type': 'application/json',
	   	'Authorization': accessToken,
	   },
		body: JSON.stringify(newFormData),
	};
	const response = await fetchWithRefreshToken(url, options);
	return response;
};

// Тело запроса: { "email": "" } 
// Тело успешного ответа: { "success": true, "message": "Reset email sent" }
export const forgotPasswordRequest = async (email) => { 
	const url = `${apiConfig.baseUrl}/password-reset`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				 'Content-Type': 'application/json'
			},
			body: JSON.stringify(email),
	   });
		return await getResponse(response);
	} catch (error) {
		throw new Error(`Error ${error.status}`);
	} 
};


// пользователь вводит новый пароль и код из имейла
// Тело запроса: { "password": "", "token": "" }
// Тело успешного ответа: { "success": true, "message": "Password successfully reset" } 
export const resetPasswordRequest = async (formData) => { 
	const url = `${apiConfig.baseUrl}/password-reset/reset`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				 'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData),
	   });
		const data = await getResponse(response);
		return data;
	} catch (error) {
		throw new Error(`Error ${error.status}`);
	} 
};


