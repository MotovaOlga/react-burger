import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Home } from '../../pages/home/home'
import { Profile } from '../../pages/profile/profile'
import { Login } from '../../pages/login/login'
import { Registration } from '../../pages/registration/registration'
import { ResetPassword } from '../../pages/reset-password/reset-password'
import { ForgotPassword } from '../../pages/forgot-password/forgot-password'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'
import { ProtectedRoute } from '../protected-route/protected-route';
import { updateUserAction, logoutAction} from "../../services/actions/auth";
import {	getUserRequest } from '../../utils/api';


const App = () => {
	const dispatch = useDispatch();
   const navigate = useNavigate();
	let location = useLocation();
	const state = location.state || {};
	// console.log('location: ', location); //Отладка

	// const {user, isLoading, isAuth} = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(true);

	// тогда при обновлении страницы данные о пользователе из стора исчезать не будут и на странице всегда будут свежие данные
	// getUser
	useEffect(() => {
		const getUser = async () => {
			try {
				const data = await getUserRequest();
				if(data.success){
					console.log('user, ', data.user);
					// setUser(data.user); // запишем пользователя
					dispatch(updateUserAction(data.user)); // нужно ли мне вообще это хранить в сторе?
				}
			} catch (error) {
				console.log('User not found, error - ', error);
				// если вернеться ошибка, тогда удалить токен, очистить стор
				// очищаем local storage
		   	localStorage.removeItem('accessToken'); //лучше перенести это в api
		   	localStorage.removeItem('refreshToken'); //лучше перенести это в api
				// Очищаем стор
				dispatch(logoutAction());
			} finally {
				setLoading(false); // Устанавливаем загрузку завершенной
			}
		};
		getUser ();
	}, []);

	// прелоудер, можно еще создать отдельный компонент <Preloader />
	if(loading){
		return <p>Loading...</p>
	}

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<>
		
			<div className={`${styles.app} text_type_main-default`}>
			   <AppHeader />
				<Routes location={state?.backgroundLocation || location}>
			      <Route path='/' element={<Home />}></Route>

					<Route path='/profile' element={<Profile />}></Route> 
				   <Route path='/login' element={<Login />}></Route>
				   <Route path='/registration' element={<Registration />}></Route>

				   {/* <Route path='/profile' element={<ProtectedRoute component={<Profile />}/>}></Route> маршрут доступен только для авторизованных пользователей */}

				   {/* <Route path='/login' element={<ProtectedRoute component={<Login />}/>}></Route>  */}
				  
				   {/* <Route path='/registration' element={<ProtectedRoute component={<Registration />}/>}></Route>  */}

				   <Route path='/forgot-password' element={<ForgotPassword />}></Route> 

				   <Route path='/reset-password' element={<ResetPassword />}></Route>

				   <Route path='/img/:id' element={<IngredientDetails/>}></Route>
				   {/* <Route path='/ingredient-details' element={<IngredientDetails />}></Route> */}
			   </Routes> 
				{
					state?.backgroundLocation && (
						<Routes>
						   <Route 
							   path='/img/:id' 
							   element={<Modal onClose={handleModalClose} title={'Детали ингредиента'}><IngredientDetails/></Modal>}>
							</Route> 
						</Routes>
					)
				}
			</div>
	 </>
	);
}
 
export default App;


      

