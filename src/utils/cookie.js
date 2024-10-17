export function getCookie(name) {
	console.log('getCookie'); //Отладка

	const matches = document.cookie.match(
	  new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
 
export function setCookie(name, value, props) {
	console.log('setCookie'); //Отладка

	props = props || {}; // Если props не передан, инициализируем пустым объектом
	let exp = props.expires; // Получаем свойство expires из props
	if (typeof exp == 'number' && exp) {  // Если expires - это число (в секундах), создаем объект Date с новым временем
	  const d = new Date();
	  d.setTime(d.getTime() + exp * 1000);
	  exp = props.expires = d;
	}
	if (exp && exp.toUTCString) { // Если expires - это объект Date, преобразуем его в строку в формате UTC
	  props.expires = exp.toUTCString();
	}
	value = encodeURIComponent(value); // Кодируем значение cookie
	let updatedCookie = name + '=' + value; // Начинаем создавать строку cookie
	for (const propName in props) {
	  updatedCookie += '; ' + propName;  // Добавляем дополнительные свойства
	  const propValue = props[propName];
	  if (propValue !== true) { // Если свойство не равно true, добавляем его значение
		 updatedCookie += '=' + propValue;
	  }
	}
	document.cookie = updatedCookie;
}
 
export function deleteCookie(name) {
	console.log('deleteCookie'); //Отладка

	setCookie(name, null, { expires: -1 });
}