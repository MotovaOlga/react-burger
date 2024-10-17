import React, { FC, useEffect, useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import styles from './profile.module.css'
import { Input, Button,  ShowIcon, HideIcon, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogout, fetchUpdateUser, updateUserAction, logoutAction} from "../../services/actions/auth";
// import { logoutRequest,	updateUserRequest, } from '../../utils/api';
// import Orders from '../orders/orders'
import { IRootState, AppDispatch, IUser } from '../../utils/types';


export const Profile: FC = () => {
	const dispatch = useDispatch<AppDispatch>();	
	// const navigate = useNavigate();
	let location = useLocation();
	const emptyState: IUser = {
		name    : "",
		email   : "",
		password: "",
   };
	const {user, isLoading } = useSelector((state: IRootState) => state.auth);
	const [newState, setNewState] = useState<IUser>(emptyState); // новый стейт
	const [isChanged, setIsChanged] = useState<boolean>(false); // отслеживаем изменения чтобы показывать/скрывать кнопки 'Сохранить' и 'Отменить'

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

	// const handleIOnIconClick = (e) => {
	// 	e.preventDefault();
	// 	console.log('onIconClick');
	// }

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewState(prevState => ({
			...prevState,
			[name]: value // Обновление значения по имени поля
		}));
   };

	// Сохранить изменения
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(fetchUpdateUser(newState));
		setIsChanged(false); //скрываем кнопки 'Сохранить' и 'Отменить'
   };

	// Отменить изменения
	const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setNewState(user); // без пароля 
		setIsChanged(false); //скрываем кнопки 'Сохранить' и 'Отменить'
   };

	// Выход 
	const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(fetchLogout());
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
							className={ 
								location.pathname === "/profile"
								? 'text_color_primary'
								:'text-inactive-color'
							}
							>
								Профиль
							</NavLink></li>
			   		<li>
							<NavLink 
							to={'/profile/orders'} 
							className={
								location.pathname === "/profile/orders"
								? 'text_color_primary'
								:'text-inactive-color'
							}
							>
								История заказов
							</NavLink></li>
			   		<li><button onClick={handleLogout} className={`${styles.buttonLogout} text_type_main-medium text-inactive-color`}>Выход</button></li>
			   	</ul>
					<p className={`text_type_main-default pt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
			   </div>

				{/* правый  столбец */}
				<form onSubmit={handleSubmit} className={`${styles.inputs}`}>
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
								// onClick={handleSubmit}
								htmlType={'submit'}
								>
								Сохранить
							</Button>
						</>
					)}
				</form>
			</div>
		</div>
	)
};
