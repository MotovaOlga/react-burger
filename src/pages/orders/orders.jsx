import React, { useState } from 'react'
import styles from './orders.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import {	logoutRequest	} from '../../utils/api';
import { logoutAction} from "../../services/actions/auth";


export const Orders = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let location = useLocation();

	// Выход 
   // Для выхода из системы передайте в теле запроса значение refreshToken: { "token": "значение refreshToken" } 
   // Тело ответа сервера при выходе из системы: { "success": true, "message": "Successful logout" } 
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			const data = await logoutRequest();
			if (data.success) {
				// Очищаем стор
				dispatch(logoutAction());

				// Навигация на страницу входа
				navigate('/login'); // Навигация на страницу входа
	      }
		} catch (error) {
		   alert('Что-то пошло не так. Проробуйте еще раз.');
			// console.log('Logout request failed', error);
		}
	};

	return (
		<div className={`${styles.wrapper} text_color_inactive`}>
			<div className={`${styles.mainBox}`}>
				{/* левый столбец */}
			   <div className={`${styles.links} text text_type_main-medium pr-15`}>
			   	<ul>
			   		{/* <li><span className={`text_color_primary`}>Профиль</span></li> */}
			   		<li>
							<NavLink 
							to={'/profile'} 
							className={
								location.pathname === "/profile"
								? 'text_color_primary'
								:'text-inactive-color'
							}
							>
								Профиль
							</NavLink></li>
			   		<li>
							<NavLink 
							to={'/profile/orders'} 
							className={
								location.pathname === "/profile/orders"
								? 'text_color_primary'
								:'text-inactive-color'
							}
							>
								История заказов
							</NavLink></li>
						<li><button onClick={handleLogout} className={`${styles.buttonLogout} text_type_main-medium text-inactive-color`}>Выход</button></li>
			   	</ul>
			   </div>

				{/* правый  столбец */}
			   <div className={`${styles.inputs}`}>
					<h1>История заказов</h1>
					<p>...</p>
			   </div>
			</div>
		</div>
	)
};
