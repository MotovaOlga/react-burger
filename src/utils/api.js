// api config
const apiConfig = {
   // Константа для URL-адреса домена
	baseUrl: "https://norma.nomoreparties.space/api",
	// headers: {},
};

// функция которая обрабатывает-проверяет ответ
const getResponse = (response) => {
	console.log('getResponse');
	
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(`Error ${response.status}`);
};

// обертки над запросами

// Получение массива ингредиентов
// export const getIngredientsRequest = () => {
// 	console.log('getIngredientsRequest');
// 	const url = `${apiConfig.baseUrl}/ingredients`;
// 	return fetch (url)
// 	      .then(getResponse);
// }
export const getIngredientsRequest = async () => {
	console.log('getIngredientsRequest');
	const url = `${apiConfig.baseUrl}/ingredients`;
	
	try {
		 // Выполняем запрос и получаем полный ответ
		 const response = await fetch(url);
		 
		 // Обрабатываем ответ
		 const data = await getResponse(response);
		 
		 // Извлекаем массив data из полученного объекта
		 return data.data; // Предполагаем, что массив ингредиентов находится в поле data
	} catch (error) {
		 console.error('Error fetching ingredients:', error);
		 throw error; // Перебрасываем ошибку, чтобы обработать её в месте вызова
	}
};

