import React from "react";
import { useSelector } from 'react-redux'
import {Navigate, useLocation} from "react-router-dom";


export const ProtectedRouteElement = ({onlyAuth = false, component}) => { 
	// если onlyAuth = true что маршрут доступен только для авторизованных пользователей
	// если onlyAuth = false что маршрут доступен только для неавторизованных пользователей

	const {user, isLoading, isAuth} = useSelector((state) => state.auth);
	const location = useLocation();
	// console.log('location - ', location);
	// console.log('isAuth - ', isAuth);
	// console.log('onlyAuth - ', onlyAuth);
	// console.log('user - ', user);

	if(isLoading) {
		return <p>Loading...</p>
	}

	if(onlyAuth && !isAuth){ // true && !false, маршрут только для авторизованных пользователей, а он не авторизован, тогда -> to /login
	   //  console.log('onlyAuth && !isAuth to /login'); // Отладка
		return <Navigate to={'/login'} state={{ from: location }}></Navigate>
	}
 
	// уже авторизованного пользователя из /login, /registration, /forgot-password, /reset-password будем отправлять на главную страницу /
	if(!onlyAuth && isAuth){ // !true && true, маршрут только для неавторизованных пользователей, а он не авторизован, тогда -> to /
		// console.log('!onlyAuth && isAuth to /'); // Отладка
		return <Navigate to={'/'}></Navigate>
	}

	// в случае когда: onlyAuth && isAuth и !onlyAuth && !isAuth просто возвращаем компонент
	return component;
}
