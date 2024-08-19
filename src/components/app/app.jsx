import React, { useState, useEffect } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
// import { useDispatch, useSelector } from 'react-redux'
// import { ingredientsRequest } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	// console.log('getIngredients');
	// 	dispatch(ingredientsRequest());
   // }, []);
	// const ingredients = useSelector(state => state.ingredients.ingredients); 

	return (
		<>
			<div className={`${styles.app} text_type_main-default`}>
			   <AppHeader />
				<DndProvider backend={HTML5Backend}>	
				   <div className={styles.mainBox}>
				   	   <BurgerIngredients/>
				         <BurgerConstructor/>	
				   </div>
				</DndProvider>
			</div>
	 </>
	);
}
 
export default App;


      

