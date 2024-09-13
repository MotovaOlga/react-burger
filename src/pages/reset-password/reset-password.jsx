import React, { useState } from 'react'
import styles from './reset-password.module.css'
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../../utils/api';

export const ResetPassword = () => {
	const navigate = useNavigate();
	const emptyState = { password: "", token: "", };
	const [formData, setFormData] = useState(emptyState);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value // Обновление значения по имени поля
		}));
   };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data =  await resetPasswordRequest(formData);
			// Обработка успешного ответа
			if (data.success) {
				// В случае успеха пользователь направляется на маршрут /login
				navigate('/login');
	      }
			return data;
		} catch (error) {
		   console.log('resetPasswordRequest failed', error);
			// может быть неправильным код из письма
			alert('Неверный код. Проробуйте еще раз.');
			setFormData(emptyState);
		}
   };

	return (
		<>
		   <div className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
		   	<header className={`text text_type_main-medium text_color_primary pb-6`}>Восстановление пароля</header>
				<div className={`pb-6`}>
				   <Input
				   type={"password"}
				   placeholder={"Введите новый пароль"}
					onChange={handleInputChange}
					value={formData.password ||''}
					name={"password"}
				   size={"default"}
				   icon={"HideIcon"}
				   />
				</div>
				<div className={`pb-6`}>
				   <Input
				   type={"text"}
				   placeholder={"Введите код из письма"}
					onChange={handleInputChange}
					value={formData.token ||''}
					name={"token"}
				   size={"default"}
				   // icon={"EditIcon"}
				   />
				</div>
				
				<Button
					type={'primary'}
					size={'large'}
					onClick={handleSubmit}
					htmlType={'button'}
					>
						Сохранить
					</Button>

				<span className={`${styles.additionalActions} pt-20`}>Вспомнили пароль?
				   <Link to={'/login'} className="text_color_accent pl-2">Войти</Link>
				</span>
					
		   </div>
		   	
		</>
	)

};
