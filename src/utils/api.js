// api config
const apiConfig = {
   // Константа для URL-адреса домена
	baseUrl: "https://norma.nomoreparties.space/api",
	// headers: {},
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
// export const fetchWithRefreshToken ...
// export const getUserRequest, ...
// export const updateUserRequest, ...

// export const forgotPasswordRequest,
// export const resetPasswordRequest,


// ???export const addOrdersRequest
// ???export const signUpRequest
// ??? мне кажется такой у меня уже есть export const getUserOrderRequest

//formData = {"email": "", "password": "", "name": "" }
export const registerRequest = async (formData) => {
	console.log('registerRequest'); //Отладка
	const url = `${apiConfig.baseUrl}/auth/register`;
	// console.log('url ', url); //Отладка

	try {
		// const response = 
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
			// console.log('data ', data); //Отладка
			if(data.success) {
				// console.log('data.success '); //Отладка
		      let accessToken = data.accessToken.split('Bearer ')[1];
				let refreshToken = data.refreshToken;
				// console.log('accessToken ', accessToken); //Отладка
				// console.log('refreshToken ', refreshToken); //Отладка
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
			}
			return data;
		});
		// return getResponse(response);
	} catch (error) {
		throw new Error(`Error ${error.status}`);
		// throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	} 
};

export const loginRequest = async ({ email, password }) => { 
	console.log('loginRequest'); //Отладка
	const url = `${apiConfig.baseUrl}/auth/login`;
	// console.log('url ', url); //Отладка

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
			// console.log('data ', data); //Отладка
			if(data.success) {
				// console.log('data.success '); //Отладка
		      let accessToken = data.accessToken.split('Bearer ')[1];
				let refreshToken = data.refreshToken;
				// console.log('accessToken ', accessToken); //Отладка
				// console.log('refreshToken ', refreshToken); //Отладка
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
			}
			return data;
		});
	} catch (error) {
		throw new Error(`Error ${error.status}`);
		// throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	} 

};

// Для выхода из системы передайте в теле запроса значение refreshToken
export const logoutRequest = async () => {
	console.log('logoutRequest'); //Отладка
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
		   // console.log('Отладка data ', data); //Отладка
		   if (data.success) {
		   	// очищаем local storage
		   	localStorage.removeItem('accessToken');
		   	localStorage.removeItem('refreshToken');
		   }
		   return data;
	   });
	} catch (error) {
		throw new Error(`Error ${error.status}`);
		// throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	} 
};

// отправляю refreshToken и получаю 2 новых токена: refreshToken и accessToken
export const refreshTokenRequest = async () => {
	console.log('refreshTokenRequest'); //Отладка
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
				console.log('refreshData ', refreshData); //Отладка
				if(refreshData.success) {
					console.log('refreshData.success '); //Отладка
			      let accessToken = refreshData.accessToken.split('Bearer ')[1];
					let refreshToken = refreshData.refreshToken;
					// console.log('accessToken ', accessToken); //Отладка
					// console.log('refreshToken ', refreshToken); //Отладка
					localStorage.setItem('accessToken', accessToken);
					localStorage.setItem('refreshToken', refreshToken);
				} 
				// else {
				// 	console.log('refreshData.message ', refreshData.message); //Отладка
				// 	return Promise.reject(new Error(refreshData.message || 'Unknown error'));
			   // }
				return refreshData;
			});
	} catch (error) {
		throw new Error(`Error ${error.status}`);
		// throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	} 
};


export const fetchWithRefreshToken = async () => {
	console.log( 'fetchWithRefreshToken' );
	const url = `${apiConfig.baseUrl}/auth/user`;

	try {
		console.log('try1 '); //Отладка
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 1' + localStorage.getItem('accessToken'),
			},
	   })
		// Если ответ не ок, выбрасываем ошибку
	   if (!response.ok) {
			throw new Error(`Error ${response.status}`);
		   // throw Promise.reject(`Error ${response.status}`);
      }
		return response.json();
	} catch (error) {
		console.error('error1 ', error); //Отладка
		console.log('error1.message ', error.message); //Отладка
		console.log('error1.status ', error.status); //Отладка

		// if (error.message.includes('jwt expired')) { // Более гибкая проверка
		// if(error.message === 'jwt expired') {
		// if(error.status === 403) {
		if (error.message.includes('Error 403')) {
			console.log('error.message.includes(Error 403) = true'); //Отладка
			try {
		      // console.log('try2 '); //Отладка

				const refreshData = await refreshTokenRequest();
		      // console.log('refreshData ', refreshData); //Отладка
				
				if (!refreshData.success) {
				  return Promise.reject(refreshData);
				}
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
					},
			   })
				return getResponse(response);
			} catch (refreshError) {
				 return Promise.reject(refreshError);
			}
	  } else {
			return Promise.reject(error);
	  }
	} 
};


// Для работы с данными о пользователе (обновлении информации и получении данных о пользователе) используется token. 
export const getUserRequest = (token) => {
	return console.log( 'getUserRequest' );
	// return fetchWithRefreshToken2(()=>{
	// 	 return myFetch2(config.userUrl, 'GET', token);
	// })//.then(checkResponse);
};

// Для работы с данными о пользователе (обновлении информации и получении данных о пользователе) используется token. 
export const updateUserRequest = (params) => {
	return console.log('updateUserRequest');
	// return fetchWithRefreshToken2(()=>{
	// 	 return myFetch(config.userUrl, 'PATCH', params);
	// }).then(checkResponse);
};

// export const forgotPasswordRequest
// export const resetPasswordRequest