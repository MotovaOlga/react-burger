import React from 'react'
import styles from './registration.module.css'
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Routes, Route } from 'react-router-dom'


export const Registration = () => {
	return (
		<>
		   <div className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
		   	<header className={`text text_type_main-medium text_color_primary pb-6`}>Регистрация</header>
				<div className={`pb-6`}>
				   <Input
				   type={"text"}
				   placeholder={"Имя"}
				   // value={state.name||''}
				   // name={"name"}
				   size={"default"}
				   // icon={"EditIcon"}
				   />
				</div>
				<div className={`pb-6`}>
				   <Input
				   type={"email"}
				   placeholder={"E-mail"}
				   // value={"mail@stellar.burgers"}
				   // {state.name||''}
				   // name={"name"}
				   size={"default"}
				   // icon={"EditIcon"}
				   />
				</div>
				<div className={`pb-6`}>
				   <Input
				   	type={"password"}
				   	placeholder={"Пароль"}
				   	// value={"*****"}
                  size={"default"}
				   	icon={"ShowIcon"}
				   	/>
				</div>
				
				<Button
					type={'primary'}
					size={'large'}
					onClick={()=>console.log('Button onClick')}
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
