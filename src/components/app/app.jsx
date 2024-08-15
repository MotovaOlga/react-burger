import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ingredientsRequest } from '../../services/actions/ingredients';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('getIngredients');
		dispatch(ingredientsRequest());
   }, []);
	
	const ingredients = useSelector(state => state.ingredients.ingredients); 

	return (
		<>
			<div className={`${styles.app} text_type_main-default`}>
			   <AppHeader />
				<div className={styles.mainBox}>
				   <BurgerIngredients ingredients={ingredients}/>
				   <BurgerConstructor/>
				</div>
			</div>
	 </>
	);
}
 
export default App;


      

