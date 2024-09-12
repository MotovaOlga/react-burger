import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { Input, Button,  ShowIcon, HideIcon, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction, updateUserAction, logoutAction} from "../../services/actions/auth";
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import {
	// registerRequest,
	// loginRequest,
	logoutRequest,
	// refreshTokenRequest,
	// fetchWithRefreshToken,
	getUserRequest,
	updateUserRequest, 
} from '../../utils/api';

export const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emptyState = {
		name    : "",
		email   : "",
		password: "",
   };
	// const user = useSelector((store) => store.auth.user);
	const [user, setUser] = useState(emptyState); // стейт
	const [newState, setNewState] = useState(emptyState); // новый стейт
	const [isLoading, setIsLoading] = React.useState(true);

	// тогда при обновлении страницы данные о пользователе исчезать не будут и при переходе на эту страницу всегда будут свежие данные
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUserRequest();
				if(data.success){
					console.log('user, ', data.user);
					setUser(data.user);
					setNewState(data.user);
					dispatch(updateUserAction(data.user)); // нужно ли мне вообще это хранить в сторе?
				}
			} catch (error) {
				console.log('getUser failed', error);
				// если вернеться ошибка, тогда удалить токен, очистить стор и перенаправить на страницу логина?????????????????????????????
				// обработать исходя с того какой код ошибки
				// 403 не авторизован
			} finally {
				setIsLoading(false); // Устанавливаем загрузку завершенной
			}
		};

		fetchUser ();
	}, [dispatch]); // вызывает при ...

	// прелоудер, можно еще создать отдельный компонент <Preloader />
	if(isLoading){
		return <p>Loading...</p>
	}

	// useEffect(()=>{
	// 	console.log('useEffect PROFILE'); //Отладка
	// 	setNewState({
	// 		name: user.name || '',
	// 		email: user.email || '',
	// 		password: '',
	// 	});
   // },[]);

	const handleIOnIconClick = (e) => {
		console.log('onIconClick');
	}

   const handleInputChange = (e) => {
		console.log('handleInputChange');  //Отладка
		console.log('new state ', newState);  //Отладка
		const { name, value } = e.target;
		setNewState(prevState => ({
			...prevState,
			[name]: value // Обновление значения по имени поля
		}));
   };

	// Сохранить изменения - только он сохраняет еще и пароль!!! пароль нужно только отправлять на сервер
   const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log('handleSubmit'); //Отладка
			console.log('new state ', newState);  //Отладка
			// refreshTokenRequest();
			// fetchWithRefreshToken();
	      // updateUserRequest(newState);
			// const data = await getUserRequest();
			// const data = await updateUserRequest({name: 'Katerine', email: 'katyakatya@gmail.com', password: 'qwerty1'});
			const data = await updateUserRequest(newState);
			// Обработка успешного ответа
			// console.log('handleSubmit successful, data: ', data); //Отладка
			if (data.success) {
				console.log('handleSubmit data.success: ', data); //Отладка
				// const res = await getUserRequest();
				// console.log('handleSubmit res: ', res); //Отладка

				dispatch(updateUserAction(data.user)); 
				const res = await getUserRequest();  //Отладка
				console.log('res.user: ', res.user); //Отладка
	      }
			
		} catch (error) {
		  console.log('updateUserRequest failed', error);
		  	// ЧТО ДЕЛАТЬ если не получил ответа от сервера??? 
		}

   };

	// Отменить изменения
	const handleReset = (e) => {
		console.log('handleReset'); //Отладка
		e.preventDefault();
		setNewState(user); // без пароля будет
   };

   // useEffect(()=>{
	// 	console.log('useEffect PROFILE'); //Отладка
	// 	setNewState({
	// 		name: user.name || '',
	// 		email: user.email || '',
	// 		password: '',
	// 	});
   // },[]);


   // useEffect(()=>{
	// 	dispatch(getUserAction())
   // },[]);

	// Выход 
   // Для выхода из системы передайте в теле запроса значение refreshToken: { "token": "значение refreshToken" } 
   // Для выхода из системы или обновления токена используется именно refreshToken, который можно получить после успешной регистрации или авторизации.
   // Тело ответа сервера при выходе из системы: { "success": true, "message": "Successful logout" } 
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			console.log('handleLogout LOGOUT'); //Отладка

			const data = await logoutRequest();
			console.log('Logout successful, data: ', data); //Отладка

			if (data.success) {
				// Очищаем стор
				dispatch(logoutAction());

				// Навигация на страницу входа
				navigate('/login'); // Навигация на страницу входа
				// <Navigate to={'/login'}/> // Используй в JSX для навигации при рендеринге компонента,
	      }
		} catch (error) {
			console.log('Logout request failed', error);
			// что делать если не успешно прошел запрос???
		}
	};


	return (
		<div className={`${styles.wrapper} text_color_inactive`}>
			<div className={`${styles.mainBox}`}>
				{/* левый столбец */}
			   <div className={`${styles.links} text text_type_main-medium pr-15`}>
			   	<ul>
			   		<li><span className={`text_color_primary`}>Профиль</span></li>
			   		<li>История заказов</li>
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
							onIconClick={handleIOnIconClick}
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
							onIconClick={handleIOnIconClick}
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
							onIconClick={handleIOnIconClick}
						   />
							</li>
			   	</ul>
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
			   </div>

			</div>
		</div>
	)
};
