// api config
const apiConfig = {
   // Константа для URL-адреса домена
	baseUrl: "https://norma.nomoreparties.space/api",
	// headers: {},
};

// функция которая обрабатывает-проверяет ответ
const getResponse = (response) => {
	// console.log('getResponse'); //Отладка
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

// export const registerRequest, !!!
// export const loginRequest, !!!
// export const logoutRequest, !!!
// export const refreshTokenRequest, ...
// export const updateUserRequest, ...
// export const forgotPasswordRequest,
// export const resetPasswordRequest,
// export const getUserRequest,


// ???const fetchWithRefreshToken
// ???export const addOrdersRequest
// ???export const signUpRequest
// ??? мне кажется такой у меня уже есть export const getUserOrderRequest

// запрос 
export const registerRequest = async (formData) => {
	const url = `${apiConfig.baseUrl}/auth/register`;
	console.log('url ', url); //Отладка

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
		.then(getResponse);
		// return getResponse(response);
	} catch (error) {
		throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	} 
};

// запрос 
export const loginRequest = async ({ email, password }) => { 
	const url = `${apiConfig.baseUrl}/auth/login`;
	console.error('url ', url); //Отладка

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
	.then(getResponse);
};

// запрос 
export const logoutRequest = () => {
	const url = `${apiConfig.baseUrl}/auth/logout`;
	return fetch(url, {
		 method: 'POST',
		 headers: {
			  'Content-Type': 'application/json'
		 },
		 body: JSON.stringify({
			  token: localStorage.getItem('refreshToken')
		 }),
	})
	.then(getResponse);
};

// запрос 
export const refreshTokenRequest = () => {
	const url = `${apiConfig.baseUrl}/auth/token`;
	return fetch(url, {
		 method: 'POST',
		 headers: {
			  'Content-Type': 'application/json'
		 },
		 body: JSON.stringify({
			  token : localStorage.getItem('refreshToken')
		 }),
	})
	.then(getResponse);
};

// Для работы с данными о пользователе (обновлении информации и получении данных о пользователе) используется token. 
export const getUserRequest = (token) => {
	return console.log( 'getUserRequest 2' );
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