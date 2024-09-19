import React, { useState} from 'react'
import styles from './registration.module.css'
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../../services/actions/auth'


export const Registration = () => {
	const emptyState = {
		name    : "",
		email   : "",
		password: "",
   };
	const [formData, setFormData] = useState(emptyState);
	const location = useLocation();
   const navigate = useNavigate();
	const dispatch = useDispatch();

	const fieldChange = (e) => {
		setFormData({
			 ...formData,
			 [e.target.name] : e.target.value
		})
   };

	const handleRegister = async (e) => {
		e.preventDefault();
		dispatch(fetchRegister(formData));
		// const from = location.state?.from?.pathname || '/';

	   //    if (data.success) {
		// 		dispatch(registerAction(data.user));
		// 		// если регистрация прошла успешно перенаправить на предыдущую страницу страницу
		// 		const from = location.state?.from?.pathname || '/';
      //       navigate(from, { replace: true });
	   //    }
	};


	return (
		<form onSubmit={handleRegister} className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
			<h2 className={`text text_type_main-medium text_color_primary pb-6`}>Регистрация</h2>
			<div className={`pb-6`}>
				<Input
				type={"text"}
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
				type={"email"}
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
					type={"password"}
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
				// onClick={handleRegister}
				htmlType={'submit'}
				>
					Зарегистрироваться
				</Button>

			<span className={`${styles.additionalActions} pt-20`}>Уже зарегистрированы?
				<Link to={'/login'} className="text_color_accent pl-2">Войти</Link>
			</span>
		</form>
	)
};
