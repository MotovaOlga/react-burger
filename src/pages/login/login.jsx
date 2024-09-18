import React, { useState } from 'react'
import styles from './login.module.css'
import { useDispatch } from 'react-redux';
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { fetchLogin } from '../../services/actions/auth'


export const Login = () => {
	const dispatch = useDispatch();
	const emptyState = { email: "", password: "", };
	const [formData, setFormData] = useState(emptyState);

	const fieldChange = (e) => {
		setFormData({
			 ...formData,
			 [e.target.name] : e.target.value
		})
   };
  
	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(fetchLogin(formData));
	};


	return (
		<>
			<form onSubmit={handleLogin} className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
				<h2 className={`text text_type_main-medium text_color_primary pb-6`}>Вход</h2>
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
					// onClick={handleLogin}
					htmlType={'submit'}
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
			</form>
		</>
	)
};