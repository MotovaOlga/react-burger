import React, { useState } from 'react'
import styles from './login.module.css'
import { useDispatch } from 'react-redux';
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {	loginRequest } from '../../utils/api';
import { loginAction } from '../../services/actions/auth'


export const Login = () => {
	const dispatch = useDispatch();
	const location = useLocation();
   const navigate = useNavigate();
	const emptyState = { email: "", password: "", };
	const [formData, setFormData] = useState(emptyState);
	// const isAuth = useSelector(state => state.auth.isAuth)

	const fieldChange = (e) => {
		setFormData({
			 ...formData,
			 [e.target.name] : e.target.value
		})
   };
  
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
		   const data = await loginRequest( formData ); 

			// Обработка успешного ответа
			if (data.success) {
				dispatch(loginAction(data.user));

            // После успешной аутентификации перенаправляем пользователя на предыдущую страницу
				// console.log('location.state ', location.state); //Отладка
				// console.log('location.state?.from?.pathname || / ', location.state?.from?.pathname || '/'); //Отладка

				const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
	      }

		} catch (error) {
		   console.log('Login request failed', error);
		   alert('Неверные данные. Проробуйте еще раз.');
		   setFormData(emptyState);
		}
	};

	// console.log('isAuth ', isAuth);
	// if (isAuth) {
	// 	return (
	// 	  <Navigate to={'/'}/>
	// 	);
	// }

	return (
		<>
		   <div className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
		   	<header className={`text text_type_main-medium text_color_primary pb-6`}>Вход</header>
				<div className={`pb-6`}>
				   <Input
				   type={"email"}
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
				   	type={"password"}
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
					onClick={handleLogin}
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