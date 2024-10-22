import React from "react";
import { useSelector } from 'react-redux'
import {Navigate, useLocation} from "react-router-dom";
import { IRootState, TProtectedRouteElementProps } from '../../utils/types';


export const ProtectedRouteElement: React.FC<TProtectedRouteElementProps> = ({onlyAuth = false, component}) => { 
	const {user, isLoading, isAuth, emailSubmitted} = useSelector((state: IRootState) => state.auth);
	const location = useLocation();

	if(isLoading) {
		return <p>Loading...</p>
	}

	if(onlyAuth && !isAuth){ // true && !false, маршрут только для авторизованных пользователей, а он не авторизован, тогда -> to /login
	   //  console.log('onlyAuth && !isAuth to /login'); // Отладка
		return <Navigate to={'/login'} state={{ from: location.pathname }}></Navigate>
	}
 
	// уже авторизованного пользователя из /login, /registration, /forgot-password, /reset-password будем отправлять на главную страницу / или на ту которой он был
	if(!onlyAuth && isAuth){ // !true && true, маршрут только для неавторизованных пользователей, а он авторизован, тогда -> to /
		// console.log('!onlyAuth && isAuth to /'); // Отладка
		const from = location.state?.from || '/';
		return <Navigate to={from}></Navigate>
	}

	// /reset-password доступен неавторизованным пользователям и только после посещения маршрута /forgot-password и ввода адреса электронной почты для восстановления пароля
	if(!onlyAuth){ // !true && true, маршрут только для неавторизованных пользователей, а он авторизован, тогда -> to /
		// console.log('ProtectedRouteElement /reset-password'); // Отладка
		const isResetPasswordRoute = window.location.pathname === '/reset-password';
		// console.log('ProtectedRouteElement /reset-password isResetPasswordRoute ', isResetPasswordRoute); // Отладка
		if(isResetPasswordRoute && !emailSubmitted) {
			return <Navigate to={'/forgot-password'}></Navigate>
		}
	}

	// в случае когда: onlyAuth && isAuth и !onlyAuth && !isAuth просто возвращаем компонент
	return component;
}
