import React, { useEffect, useState } from 'react'
import styles from './login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
	// registerRequest,
	loginRequest,
	// refreshTokenRequest,
	// logoutRequest,
	// getUserRequest,
	// updateUserRequest, 
} from '../../utils/api';
import { loginAction } from '../../services/actions/auth'
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';


export const Login = () => {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({email:'', password:''});
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

	const fieldChange = (e) => {
		setFormData({
			 ...formData,
			 [e.target.name] : e.target.value
		})
   };

  
	const handleLogin = async (e) => {
		console.log('handleLogin'); //Отладка
		console.log('formData', formData); //Отладка

		e.preventDefault();
		try {
		   const data = await loginRequest( formData ); 

			// Обработка успешного ответа
			console.log('Login successful, data: ', data); //Отладка

			if (data.success) {
				console.log('dispatch(loginAction(data.user))'); //Отладка
				dispatch(loginAction(data.user));
	      }

		} catch (error) {
		  console.log('Login failed', error);
		  	// ЧТО ДЕЛАТЬ ЕСЛИ ПАРОЛЬ И ЛОГИН НЕ ВЕРНЫЕ??? 
			// или если пользователь не зарегистрирован???
			// if (isAuthenticated) {
			// 	return (
			// 	  <Navigate to={'/registration'}/>
			// 	);
			// }
		}
	};

	// console.log('isAuthenticated ', isAuthenticated);
	if (isAuthenticated) {
		return (
		  <Navigate to={'/'}/>
		);
	}

	return (
		<>
		   <div className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
		   	<header className={`text text_type_main-medium text_color_primary pb-6`}>Вход</header>
				<div className={`pb-6`}>
				   <Input
				   // type={"text"}
				   placeholder={"E-mail"}
					onChange={fieldChange}
				   value={formData.email}
				   name={"email"}
				   size={"default"}
				   // icon={"EditIcon"}
				   />
				</div>
				<div className={`pb-6`}>
				   <Input
				   	// type={"text"}
				   	placeholder={"Пароль"}
						onChange={fieldChange}
						name={"password"}
				   	value={formData.password}
                  size={"default"}
				   	icon={"ShowIcon"}
				   	/>
				</div>
				
				<Button
					type={'primary'}
					size={'large'}
					onClick={handleLogin} //()=>console.log('Button onClick *Войти*')}
					htmlType={'button'}
					>
						Войти
					</Button>

				<span className={`${styles.additionalActions} pt-20`}>Вы — новый пользователь?
				   <Link to={'/registration'} className="text_color_accent pl-2">Зарегистрироваться</Link>
				</span>

				<span className={`${styles.additionalActions} pt-4`}>
					Забыли пароль?
					<Link to={'/forgot-password'} className="text_color_accent pl-2">Восстановить пароль</Link>
				</span>
					
		   </div>
		   	
		</>
	)
};