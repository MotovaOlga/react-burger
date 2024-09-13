import React from 'react'
import styles from './reset-password.module.css'
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Routes, Route } from 'react-router-dom'


export const ResetPassword = () => {
	return (
		<>
		   <div className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
		   	<header className={`text text_type_main-medium text_color_primary pb-6`}>Восстановление пароля</header>
				<div className={`pb-6`}>
				   <Input
				   type={"password"}
				   placeholder={"Введите новый пароль"}
				   // value={"mail@stellar.burgers"}
				   // {state.name||''}
				   // name={"name"}
				   size={"default"}
				   icon={"ShowIcon"}
				   />
				</div>
				<div className={`pb-6`}>
				   <Input
				   type={"text"}
				   placeholder={"Введите код из письма"}
				   // value={"mail@stellar.burgers"}
				   // {state.name||''}
				   // name={"name"}
				   size={"default"}
				   // icon={"EditIcon"}
				   />
				</div>
				
				<Button
					type={'primary'}
					size={'large'}
					onClick={()=>console.log('Button onClick')}
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
