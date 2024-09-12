import React, { useState, useEffect } from 'react';
// import BurgerConstructor from '../burger-constructor/burger-constructor';
// import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ingredientsRequest } from '../../services/actions/ingredients';
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import { Link, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Home } from '../../pages/home/home'
import { Profile } from '../../pages/profile/profile'
import { Login } from '../../pages/login/login'
import { Registration } from '../../pages/registration/registration'
import { ResetPassword } from '../../pages/reset-password/reset-password'
import { ForgotPassword } from '../../pages/forgot-password/forgot-password'
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'

const App = () => {
	const dispatch = useDispatch();
   const navigate = useNavigate();
	let location = useLocation();
	const state = location.state || {};
	console.log('location: ', location); //Отладка

	const {ingredients, globalLoading, globalError} = useSelector((state) => state.ingredients);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(ingredientsRequest());
   }, []);

	useEffect(() => {
		setIsLoading(globalLoading); // Синхронизируем isLoading с глобальным isLoading
	}, [globalLoading]);

	// прелоудер, можно еще создать отдельный компонент <Preloader />
	if(isLoading){
		return <p>Loading...</p>
	}


	const handleModalClose = () => {
		navigate(-1);
   };

   // const closeModal = () => {
	// 	navigate(-1);
   // };

	return (
		<>
			<div className={`${styles.app} text_type_main-default`}>
			   <AppHeader />
				<Routes location={state?.backgroundLocation || location}>
			      <Route path='/' element={<Home />}></Route>
				   <Route path='/profile' element={<Profile />}></Route>
				   <Route path='/login' element={<Login />}></Route>
				   <Route path='/registration' element={<Registration />}></Route>
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


      

