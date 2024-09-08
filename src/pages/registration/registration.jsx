import React, { useEffect, useState} from 'react'
import styles from './registration.module.css'
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../utils/api'
import { registerAction } from '../../services/actions/auth'
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';


export const Registration = () => {
	const [formData, setFormData] = useState({name:'', email:'', password:''});
	const dispatch = useDispatch();
	const isAuthorized = useSelector(state => state.auth.isAuthorized)

	const fieldChange = (e) => {
		setFormData({
			 ...formData,
			 [e.target.name] : e.target.value
		})
   };

	const handleRegister = async (e) => {
		// console.log('handleRegister'); //Отладка
		// console.log('formData', formData); //Отладка
		e.preventDefault();
		try {
		   const data = await registerRequest( formData );
			console.log('Register request successful, data: ', data); //Отладка

			
			// запишем authToken в куки
			let authToken = data.accessToken.split('Bearer ')[1];
			if (authToken) {
			   console.log('setCookie authToken - ', authToken); //Отладка
			   setCookie('token', authToken);
			}

			// запишем refreshToken в local storage
			let refreshToken = data.refreshToken;
			if (refreshToken) {
			   console.log('local storage refreshToken - ', refreshToken); //Отладка
				localStorage.setItem('refreshToken', refreshToken);
			}
 
			// запишем имя, почту и токен??? пользователя в стор
	      if (data.success) {
				dispatch(registerAction(data.user));
	      }

		} catch (error) {
		   console.log('Register failed', error);
			// если пользователь уже зарегистрирован то направлять его на страницу авторизации. что нужно проверить???
			// if (isAuthorized) {
			// 	return (
			// 	  <Navigate to={'/login'}/>
			// 	);
			// }
		}
	};

	if (isAuthorized) {
		return (
		  <Navigate to={'/'}/>
		);
	}


	return (
		<>
		   <div className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
		   	<header className={`text text_type_main-medium text_color_primary pb-6`}>Регистрация</header>
				<div className={`pb-6`}>
				   <Input
				   // type={"text"}
				   placeholder={"Имя"}
				   name={"name"}
					value={formData.name}
					onChange={fieldChange}
				   size={"default"}
				   // icon={"EditIcon"}
				   />
				</div>
				<div className={`pb-6`}>
				   <Input
				   // type={"text"}
				   placeholder={"E-mail"}
					name={"email"}
				   value={formData.email}
				   onChange={fieldChange}
				   size={"default"}
				   // icon={"EditIcon"}
				   />
				</div>
				<div className={`pb-6`}>
				   <Input
				   	// type={"text"}
				   	placeholder={"Пароль"}
						name={"password"}
				   	value={formData.password}
						onChange={fieldChange}
                  size={"default"}
				   	icon={"ShowIcon"}
				   	/>
				</div>
				
				<Button
					type={'primary'}
					size={'large'}
					onClick={handleRegister} //()=>console.log('Button-Зарегистрироваться onClick ')}
					htmlType={'button'}
					>
						Зарегистрироваться
					</Button>

				<span className={`${styles.additionalActions} pt-20`}>Уже зарегистрированы?
				   <Link to={'/login'} className="text_color_accent pl-2">Войти</Link>
				</span>

		   </div>
		   	
		</>
	)
};
