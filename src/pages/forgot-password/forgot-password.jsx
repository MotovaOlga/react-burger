import React, { useState } from 'react';
import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPasswordRequest } from '../../utils/api';

export const ForgotPassword = () => {
	const navigate = useNavigate();
	const emptyState = { email: "", };
	const [email, setEmail] = useState(emptyState);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEmail(prevState => ({
			...prevState,
			[name]: value // Обновление значения по имени поля
		}));
   };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log('handleSubmit, email - ', email);  //Отладка
			const data =  await forgotPasswordRequest(email);
			// Обработка успешного ответа
			if (data.success) {
				console.log('handleSubmit data.success: ', data); //Отладка
				// В случае успеха пользователь направляется на маршрут /reset-password
				navigate('/reset-password');
	      }
			return data;
		} catch (error) {
		   console.log('forgotPasswordRequest failed', error);
		}
   };

	return (
		<>
		   <div className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
		   	<header className={`text text_type_main-medium text_color_primary pb-6`}>Восстановление пароля</header>
				<div className={`pb-6`}>
				   <Input
				   type={"email"}
				   placeholder={"Укажите e-mail"}
					onChange={handleInputChange}
					value={email.email ||''}
					name={"email"}
				   size={"default"}
				   />
				</div>
				
				<Button
					type={'primary'}
					size={'large'}
					onClick={handleSubmit}
					htmlType={'button'}
					>
						Восстановить
					</Button>

				<span className={`${styles.additionalActions} pt-20`}>Вспомнили пароль?
				   <Link to={'/login'} className="text_color_accent pl-2">Войти</Link>
				</span>
		   </div>
		</>
	)
};