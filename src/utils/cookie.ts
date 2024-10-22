import { SetCookieProps } from "./types";

export function getCookie(name: string) {
	// console.log('getCookie'); //Отладка

	const matches = document.cookie.match(
	  new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
 
export function setCookie(name: string, value: string, props: SetCookieProps) {
	// console.log('setCookie'); //Отладка

	props = props || {}; // Если props не передан, инициализируем пустым объектом
	let exp = props.expires; // Получаем свойство expires из props
	const d = new Date();
	if (typeof exp == 'number' && exp) {  // Если expires - это число (в секундах), создаем объект Date с новым временем
	  d.setTime(d.getTime() + exp * 1000);
	  exp = props.expires = Number(d);
	}
	if (exp && d.toUTCString) { // Если expires - это объект Date, преобразуем его в строку в формате UTC
	  props.expires = d.toUTCString();
	}

	value = encodeURIComponent(value); // Кодируем значение cookie
	let updatedCookie = `${name}=${value}`; // Начинаем создавать строку cookie
	

	for (const propName in props) {
	  updatedCookie += '; ' + propName;  // Добавляем дополнительные свойства
	  const propValue = props[propName];
	  if (propValue !== true) { // Если свойство не равно true, добавляем его значение
		 updatedCookie += '=' + propValue;
	  }
	}

	document.cookie = updatedCookie;
}
 
export function deleteCookie(name: string) {
	// console.log('deleteCookie'); //Отладка

	setCookie(name, '', { expires: -1 });
}