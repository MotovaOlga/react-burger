import React, {FC} from "react";
import { useSelector } from 'react-redux'
import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRoute = ({onlyUnAuth = false, component}) => { // { auth, children }
	// const user = useSelector(getUser);
	// const isAuthChecked = useSelector(getIsAuthChecked);
	const location = useLocation();

	if(!isAuthChecked) {
		return <p>Loading...</p>
	}

	// уже авторизованного пользователя из /login и /registration отпрвлятьна на главную страницу /
	if(onlyUnAuth && user){
		return <Navigate to={'/'} state={{ from: location }}></Navigate>
	}

	// не авторизованного пользователя из /profile отправлять в /login
	if(!onlyUnAuth && !user){
		return <Navigate to={'/login'} state={{ from: location }}></Navigate>
	}

	// нельзя отправить заказ не авторизованному пользователю

	return component;
	// return children;
}
