import React from 'react'
import styles from './profile.module.css'
import { Input, Button,  ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Routes, Route } from 'react-router-dom'


export const Profile = () => {
	const [value, setValue] = React.useState('value');
	const inputRef = React.useRef(null);
	// const onIconClick = () => {
	//   setTimeout(() => inputRef.current.focus(), 0);
	//   alert('Icon Click Callback');
	// };


	return (
		<div className={`${styles.wrapper} text_color_inactive`}>
			<div className={`${styles.mainBox}`}>
				{/* левый столбец */}
			   <div className={`${styles.links} text text_type_main-medium pr-15`}>
			   	<ul>
			   		<li><span className={`text_color_primary`}>Профиль</span></li>
			   		<li>История заказов</li>
			   		<li><Link to={'/login'} className="pl-2">Выход</Link></li>
			   	</ul>
					<p className={`text_type_main-default pt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
			   </div>

				{/* правый  столбец */}
			   <div className={`${styles.inputs}`}>
			      <ul>
			   		<li>
							<Input
						   type={"text"}
						   placeholder={"Имя"}
							value={"Марк"}
							// {state.name||''}
                     name={"name"}
                     size={"default"}
							icon={"EditIcon"}
						   />
							</li>
						<li>
							<Input
						   type={"email"}
						   placeholder={"Логин"}
							value={"mail@stellar.burgers"}
                     size={"default"}
							icon={"EditIcon"}
						   />
							</li>
						<li>
							<Input
						   type={"password"}
						   placeholder={"Пароль"}
							value={"*****"}
                     size={"default"}
							icon={"EditIcon"}
						   />
							</li>
			   	</ul>
					<Button
					type={'secondary'}
					size={'large'}
					onClick={()=>console.log('Button onClick')}
					htmlType={'button'}
					>
						Отменить
					</Button>
					<Button
					type={'primary'}
					size={'large'}
					onClick={()=>console.log('Button onClick')}
					htmlType={'button'}
					>
						Сохранить
					</Button>
			   </div>

			</div>
		</div>
	)
};
