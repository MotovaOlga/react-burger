import React, { useState, useEffect } from 'react';
// import BurgerConstructor from '../burger-constructor/burger-constructor';
// import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
// import { useDispatch, useSelector } from 'react-redux'
// import { ingredientsRequest } from '../../services/actions/ingredients';
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import { Link, Routes, Route } from 'react-router-dom'
import { Home } from '../../pages/home/home'
import { Profile } from '../../pages/profile/profile'
import { Login } from '../../pages/login/login'
import { Registration } from '../../pages/registration/registration'
import { ResetPassword } from '../../pages/reset-password/reset-password'
import { ForgotPassword } from '../../pages/forgot-password/forgot-password'

const App = () => {
	// const dispatch = useDispatch();

	// // И отрисовывать BurgerIngredients и BurgerConstructor только если запрос завершился и пришли ингредиенты
	// const {ingredients, globalLoading, globalError} = useSelector((state) => state.ingredients);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	dispatch(ingredientsRequest());
   // }, []);

	// useEffect(() => {
	// 	setLoading(globalLoading); // Синхронизируем локальное состояние с глобальным
	// }, [globalLoading]);

	return (
		<>
			<div className={`${styles.app} text_type_main-default`}>
			   <AppHeader />
				{/* {loading ? (
					<div>Loading...</div>
				) : globalError ? (
					<div>Error: {globalError.message}</div>
				) : (ingredients?.length > 0) ? (
					<DndProvider backend={HTML5Backend}>	
				      <div className={styles.mainBox}>
				      	<BurgerIngredients/>
				         <BurgerConstructor/>	
				      </div>
				   </DndProvider>
				) : (<div>No ingredients</div>)
			   } */}
				<Routes>
			      <Route path='/' element={<Home />}></Route>
				   <Route path='/profile' element={<Profile />}></Route>
				   <Route path='/login' element={<Login />}></Route>
				   <Route path='/registration' element={<Registration />}></Route>
				   <Route path='/forgot-password' element={<ForgotPassword />}></Route>
				   <Route path='/reset-password' element={<ResetPassword />}></Route>
				   {/* <Route path='/ingredient-details' element={<IngredientDetails />}></Route> */}
			   </Routes> 
			</div>
	 </>
	);
}
 
export default App;


      

