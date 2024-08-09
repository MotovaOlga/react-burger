import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
// import { store } from '../../services/store';
import { ingredientsRequest } from '../../services/actions/ingredients';
// import { initialState } from '../../services/reducers/ingredients'; // Импортируйте из вашего файла состояния
// export type RootState = typeof initialState;
// import { RootState } from '../../utils/types';
import { INGREDIENTS_REQUEST, INGREDIENTS_LOADING, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOAD_ERROR } from '../../services/actions/types'

// // Определение типа для ингредиента
// interface Ingredient {	
//    _id: string;
//    name: string;
//    type: string;
//    proteins: number;
//    fat: number;
//    carbohydrates: number;
//    calories: number;
//    price: number;
//    image: string;
//    image_mobile: string;
//    image_large: string;
//    __v?: number;
//    productId:string
//    count?: number
// }

// Константа для URL-адреса домена
// const API_URL = 'https://norma.nomoreparties.space/api';

const App = () => {
   // const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);

	const dispatch = useDispatch();
   // const loading = useSelector(state => state.ingredients.loading); // Предполагается, что у вас есть состояние загрузки
   // const error = useSelector(state => state.ingredients.error); // Предполагается, что у вас есть состояние ошибки

	useEffect(() => {
		console.log('getIngredients');
		dispatch(ingredientsRequest());
   }, []);
	
	const ingredients = useSelector(state => state.ingredients.ingredients); // Предполагается, что у вас есть редуктор для ингредиентов


	// const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState<string | null>(null);
 
	// useEffect(() => {
	//   // Функция для выполнения запроса к API
	//   const fetchIngredients = async () => {
	// 	 setLoading(true);
	// 	 try {
	// 		const response = await fetch(`${API_URL}/ingredients`);
	// 		if (!response.ok) {
	// 		  throw new Error(`HTTP error! status: ${response.status}`);
	// 		}
	// 		const data = await response.json();
	// 		if (data.success) {
	// 			setIngredients(data.data);
	// 		 } else {
	// 			throw new Error('The API response was not successful');
	// 		 }
	// 	 } catch (error) {
	// 		if (error instanceof Error) { // Проверка типа
	// 			setError(error.message);
	// 		  } else {
	// 			setError('An unexpected error occurred');
	// 		  }
	// 		// setError('Failed to fetch ingredients: ' + error.message);
	// 	 } finally {
	// 		setLoading(false);
	// 	 }
	//   };
 
	//   // Вызов функции для получения ингредиентов
	//   fetchIngredients();
	// }, []);
 
	// if (loading) {
	//   return <div>Loading...</div>;
	// }
 
	// if (error) {
	//   return <div>Error: {error}</div>;
	// }


	// const currentState = store.getState();
   // console.log(currentState);

	return (
		<>
			<div className={`${styles.app} text_type_main-default`}>
			   <AppHeader />
				<div className={styles.mainBox}>
					{/*  Полученные данные используйте в компонентах BurgerConstructor и BurgerIngredients. */}
				   <BurgerIngredients ingredients={ingredients}/>
				   <BurgerConstructor ingredients={ingredients}/>
				</div>
			</div>
	 </>
	);
 }
 
 export default App;


      

