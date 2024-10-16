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
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { fetchUser} from "../../services/actions/auth";
import { Orders } from '../../pages/orders/orders'
import { ingredientsRequest } from '../../services/actions/ingredients';


const App = () => {
	const dispatch = useDispatch();
   const navigate = useNavigate();
	let location = useLocation();
	const state = location.state || {};
	const loading = useSelector((state) => state.auth.isLoading);
	// console.log('App - loading: ', loading); //Отладка

	useEffect(() => {
		dispatch(ingredientsRequest());
	}, [dispatch]);

	// при обновлении страницы данные о пользователе из стора исчезать не будут и на странице всегда будут свежие данные
	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	// прелоудер, можно еще создать отдельный компонент <Preloader />
	if(loading){
		return <p>Loading...</p>
	}

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<div className={`${styles.app} text_type_main-default`}>
			<AppHeader />
			<Routes location={state?.backgroundLocation || location}>
				<Route path='/' element={<Home />}></Route>
				<Route path='/img/:id' element={<IngredientDetails/>}></Route>

				{/* маршрут доступен только для Авторизованных пользователей */}
				<Route path='/profile' element={<ProtectedRouteElement onlyAuth={true} component={<Profile />}/>}></Route> 
				<Route path='/profile/orders' element={<ProtectedRouteElement onlyAuth={true} component={<Orders />}/>}></Route> 

				{/* маршрут доступен только для НЕавторизованных пользователей */}
				<Route path='/login' element={<ProtectedRouteElement onlyAuth={false} component={<Login />}/>}></Route> 
				<Route path='/registration' element={<ProtectedRouteElement onlyAuth={false} component={<Registration />}/>}></Route> 
				<Route path='/forgot-password' element={<ProtectedRouteElement onlyAuth={false} component={<ForgotPassword />}/>}></Route>
				<Route path='/reset-password' element={<ProtectedRouteElement onlyAuth={false} component={<ResetPassword />}/>}></Route>
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
	);
}
 
export default App;


      

