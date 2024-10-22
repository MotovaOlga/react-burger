import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
import styles from './registration.module.css'
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../../services/actions/auth'
import { AppDispatch, IUser } from '../../utils/types';


export const Registration: FC = () => {
	const dispatch = useDispatch<AppDispatch>();	

	const emptyState: IUser = {
		name    : "",
		email   : "",
		password: "",
   };
	const [formData, setFormData] = useState<IUser>(emptyState);

	const fieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			 ...formData,
			 [e.target.name] : e.target.value
		})
   };

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(fetchRegister(formData));
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
					onPointerEnterCapture={undefined} 
					onPointerLeaveCapture={undefined}
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
					onPointerEnterCapture={undefined} 
					onPointerLeaveCapture={undefined}
				/>
			</div>
			<div className={`pb-6`}>
				<Input
					type={"password"}
					placeholder={"Пароль"}
					name={"password"}
					value={formData.password ?? ''}
					onChange={fieldChange}
					size={"default"}
					icon={"ShowIcon"}
					onPointerEnterCapture={undefined} 
					onPointerLeaveCapture={undefined}
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
