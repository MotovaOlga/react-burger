import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { Input, Button,  ShowIcon, HideIcon, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserAction, logoutAction} from "../../services/actions/auth";
import {	logoutRequest,	updateUserRequest, } from '../../utils/api';
// import Orders from '../orders/orders'

export const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emptyState = {
		name    : "",
		email   : "",
		password: "",
   };
	const {user, isLoading, isAuth} = useSelector((state) => state.auth);
	const [newState, setNewState] = useState(emptyState); // новый стейт
	const [isChanged, setIsChanged] = useState(false); // отслеживаем изменения чтобы показывать/скрывать кнопки 'Сохранить' и 'Отменить'

	useEffect(() => {
		setNewState(user); // заполним поля инпутов
	}, [user]);

	useEffect(() => {
		const isUserChanged = JSON.stringify(newState) !== JSON.stringify(user);
		setIsChanged(isUserChanged);
   }, [newState, user]);

	// прелоудер, можно еще создать отдельный компонент <Preloader />
	if(isLoading){
		return <p>Loading...</p>
	}

	// if(isAuth){
	// 	return <Navigate to={'/login'}></Navigate>
	// }

	// const handleIOnIconClick = (e) => {
	// 	e.preventDefault();
	// 	console.log('onIconClick');
	// }

   const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewState(prevState => ({
			...prevState,
			[name]: value // Обновление значения по имени поля
		}));
   };

	// Сохранить изменения
   const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await updateUserRequest(newState);
			// Обработка успешного ответа
			if (data.success) {
				dispatch(updateUserAction(data.user)); 
				setIsChanged(false); //скрываем кнопки 'Сохранить' и 'Отменить'
	      }
		} catch (error) {
		   console.log('updateUserRequest failed', error);
		   alert('Что-то пошло не так. Проробуйте еще раз.');
			setNewState(user);
		}

   };

	// Отменить изменения
	const handleReset = (e) => {
		e.preventDefault();
		setNewState(user); // без пароля 
		setIsChanged(false); //скрываем кнопки 'Сохранить' и 'Отменить'
   };

	// Выход 
   // Для выхода из системы передайте в теле запроса значение refreshToken: { "token": "значение refreshToken" } 
   // Тело ответа сервера при выходе из системы: { "success": true, "message": "Successful logout" } 
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			const data = await logoutRequest();
			if (data.success) {
				// Очищаем стор
				dispatch(logoutAction());

				// Навигация на страницу входа
				navigate('/login'); // Навигация на страницу входа
	      }
		} catch (error) {
			console.log('Logout request failed', error);
		}
	};


	return (
		<div className={`${styles.wrapper} text_color_inactive`}>
			<div className={`${styles.mainBox}`}>
				{/* левый столбец */}
			   <div className={`${styles.links} text text_type_main-medium pr-15`}>
			   	<ul>
			   		{/* <li><span className={`text_color_primary`}>Профиль</span></li> */}
			   		<li>
							<NavLink 
							to={'/profile'} 
							className={({isActive}) => isActive ? 'text_color_primary' : 'text'}
							>
								Профиль
							</NavLink></li>
			   		<li>
							<NavLink 
							to={'/profile/orders'} 
							className={({isActive}) => isActive ? 'text_color_primary' : 'text'}
							>
								История заказов
							</NavLink></li>
			   		<li><button onClick={handleLogout}>Выход</button></li>
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
							onChange={handleInputChange}
							value={newState.name ||''}
                     name={"name"}
                     size={"default"}
							icon={"EditIcon"}
							// onIconClick={handleIOnIconClick}
						   />
							</li>
						<li>
							<Input
						   type={"email"}
						   placeholder={"Логин"}
							onChange={handleInputChange}
							value={newState.email ||''}
                     name={"email"}
                     size={"default"}
							icon={"EditIcon"}
							// onIconClick={handleIOnIconClick}
						   />
							</li>
						<li>
							<Input
						   type={"password"}
						   placeholder={"Пароль"}
							onChange={handleInputChange}
							value={newState.password ||''}
                     name={"password"}
                     size={"default"}
							icon={"EditIcon"}
							// onIconClick={handleIOnIconClick}
						   />
							</li>
			   	</ul>
					{isChanged && (
						<>
							<Button
								type={'secondary'}
								size={'large'}
								onClick={handleReset}
								htmlType={'button'}
								>
								Отменить
								</Button>
							<Button
								type={'primary'}
								size={'large'}
								onClick={handleSubmit}
								htmlType={'button'}
								>
								Сохранить
							</Button>
						</>
					)}
			   </div>
			</div>
		</div>
	)
};
