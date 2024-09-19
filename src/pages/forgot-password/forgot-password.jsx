import React, { useState, useEffect } from 'react';
import styles from './forgot-password.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { fetchForgotPassword } from "../../services/actions/auth";


export const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emptyState = { email: "", };
	const [email, setEmail] = useState(emptyState);
	const emailSubmitted = useSelector((state) => state.auth.emailSubmitted);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEmail(prevState => ({
			...prevState,
			[name]: value // Обновление значения по имени поля
		}));
   };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(email) {
			dispatch(fetchForgotPassword(email));
		}
   };

	// В случае успеха пользователь направляется на маршрут /reset-password
	useEffect(()=>{
		if (emailSubmitted) { // emailSubmitted = true
			navigate('/reset-password');
		}
	}, [emailSubmitted])


	return (
		<form onSubmit={handleSubmit} className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
			<h2 className={`text text_type_main-medium text_color_primary pb-6`}>Восстановление пароля</h2>
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
				// onClick={handleSubmit}
				htmlType={'submit'}
				>
					Восстановить
				</Button>

			<span className={`${styles.additionalActions} pt-20`}>Вспомнили пароль?
				<Link to={'/login'} className="text_color_accent pl-2">Войти</Link>
			</span>
		</form>
	)
};