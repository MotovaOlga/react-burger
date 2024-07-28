import './app.css';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Определение типа для ингредиента
interface Ingredient {	
	_id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
    productId:string
    count?: number
 }

// Константа для URL-адреса домена
const API_URL = 'https://norma.nomoreparties.space/api';

function App() {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
 
	useEffect(() => {
	  // Функция для выполнения запроса к API
	  const fetchIngredients = async () => {
		 setLoading(true);
		 try {
			const response = await fetch(`${API_URL}/ingredients`);
			if (!response.ok) {
			  throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data.success) {
				setIngredients(data.data);
			 } else {
				throw new Error('The API response was not successful');
			 }
		 } catch (error) {
			if (error instanceof Error) { // Проверка типа
				setError(error.message);
			  } else {
				setError('An unexpected error occurred');
			  }
			// setError('Failed to fetch ingredients: ' + error.message);
		 } finally {
			setLoading(false);
		 }
	  };
 
	  // Вызов функции для получения ингредиентов
	  fetchIngredients();
	}, []);
 
	if (loading) {
	  return <div>Loading...</div>;
	}
 
	if (error) {
	  return <div>Error: {error}</div>;
	}
	
	return (
		<>
			{/* {console.log(ingredients.map(product => product._id))} */}
			{console.log(ingredients.map(product => product.name))}

		
			<div>
			<AppHeader />
				<div className='mainBox'>
					{/*  Полученные данные используйте в компонентах BurgerConstructor и BurgerIngredients. */}
				<BurgerIngredients ingredients={ingredients}/>
				<BurgerConstructor ingredients={ingredients}/>
				</div>
			</div>
	 </>
	);
 }
 
 export default App;


      

