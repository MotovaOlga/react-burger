import React from "react";
import { useSelector } from 'react-redux'
import {Navigate, useLocation} from "react-router-dom";


export const ProtectedRoute = ({onlyAuth = false, component}) => { 
	// если onlyAuth = true что маршрут доступен только для авторизованных пользователей
	// если onlyAuth = false что маршрут доступен только для неавторизованных пользователей

	const {user, isLoading, isAuth} = useSelector((state) => state.auth);
	const location = useLocation();
	console.log('location - ', location);
	console.log('isAuth - ', isAuth);
	console.log('onlyAuth - ', onlyAuth);
	console.log('user - ', user);

	if(isLoading) {
		return <p>Loading...</p>
	}

	// уже авторизованного пользователя из /login и /registration отправлять на главную страницу /
	// маршрут доступен только для неавторизованных пользователей а пользователь есть: /login и /registration 
	if(!onlyAuth && !isAuth){ // true && false
	   // const { from } = location.state || { from: {pathname: '/'}}; // страничка с которой пришел пользователь, если ее нет то главная страница
		// return <Navigate to={'/'} state={ from.location }></Navigate>
		return <Navigate to={'/login'}></Navigate>
		// return <Navigate to={'/login'} state={ {from: location} }></Navigate>
	}
 
	// не авторизованного пользователя из /profile отправлять в /login
	// нельзя отправить заказ не авторизованному пользователю, он нажимает на "оформить заказ" и оказывается на странице логин
	// маршрут доступен только для авторизованных пользователей а пользователя нет
	if(onlyAuth && !isAuth){ 
		// return <Navigate to={'/'} state={ {from: location} }></Navigate>
		return <Navigate to={'/ResetPassword'}></Navigate>
	}

	// в случае когда: onlyUnAuth && !user и !onlyUnAuth && user просто возвращаем компонент
	return component;
}
