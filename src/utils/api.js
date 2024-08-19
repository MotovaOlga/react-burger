// api config
const apiConfig = {
   // Константа для URL-адреса домена
	baseUrl: "https://norma.nomoreparties.space/api",
	// orderUrl: "https://norma.nomoreparties.space/api",
	// headers: {},
};
// Эндпоинт: POST https://norma.nomoreparties.space/api/orders
// Тело запроса: { "ingredients": ["60666c42cc7b410027a1a9b1", "609646e4dc916e00276b286e","609646e4dc916e00276b2870", "60666c42cc7b410027a1a9b1"] } 

// функция которая обрабатывает-проверяет ответ
const getResponse = (response) => {
	// console.log('getResponse');
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(`Error ${response.status}`);
};


// обертки над запросами
export const getIngredientsRequest = async () => {
	// console.log('getIngredientsRequest');
	const url = `${apiConfig.baseUrl}/ingredients`;
	
	try {
		// Выполняем запрос и получаем полный ответ
		const response = await fetch(url);

		// Обрабатываем ответ
		const data = await getResponse(response);

		// Извлекаем массив data из полученного объекта
		return data.data; // Предполагаем, что массив ингредиентов находится в поле data
		
	} catch (error) {
		//  console.error('Error fetching ingredients:', error);
		throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	}
};

export const getOrderRequest = async (orderData) => {
	const url = 'https://norma.nomoreparties.space/api/orders';
	// console.log('orderData:', orderData); //отладка
	// console.log('url:', url); //отладка
	// console.log('JSON.stringify(orderData):', JSON.stringify(orderData)); //отладка

	try {
		// Выполняем запрос и получаем полный ответ
		 const response = await fetch(url, {
			  method: 'POST',
			  headers: {
					'Content-Type': 'application/json;charset=utf-8',
			  },
			  body: JSON.stringify(orderData),
		 });
	   //  console.log('response1:', response); //отладка !!! вот тут моя ошибка выводиться

		// Обрабатываем ответ
		// getResponse - Проверяем, что ответ успешный
		const data = await getResponse(response);
		return data;
	} catch (error) {
		//  console.error('Error creating order:', error);
		//  throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
		return Promise.reject(error);
	}
};

