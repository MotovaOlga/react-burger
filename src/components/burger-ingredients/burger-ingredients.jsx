import React, {useState, useEffect}from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { Tab }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'

import IngredientList from './ingredient-list/ingredient-list'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'


const BurgerIngredients = ({ ingredients }) => {
	const [current, setCurrent] = React.useState('Buns');
	const [isModalOpen, setIsModalOpen] = React.useState(true);

	useEffect(() => {
		console.log(isModalOpen);
	}, [isModalOpen]);

	const onClose = () => {
		setIsModalOpen(false);
	};

	function onOpen (id) {
		setIsModalOpen(true);
		//надо найти в api этот ингредиент с заданым id
		const details = ingredients.filter((product) => product._id === id);
		console.log(id);
	};

	const arrBun = ingredients.filter((product) => product.type === 'bun');
	const arrMain= ingredients.filter((product) => product.type === 'main');
	const arrSauce=ingredients.filter((product) => product.type === 'sauce');

	const setTab = (tab) => {
		setCurrent(tab);
		// const element = document.getElementById(tab);
		// if (element) element.scrollIntoView({ behavior: "smooth" });
	};

	return(
		<div className={styles.burgerIngredients}>
			{/* модальное окно */}
			{
				isModalOpen && 
				<Modal onClose={onClose}>
					{/* {console.log(params.id)} */}
					<h1>params</h1>
					<IngredientDetails/>
				</Modal>
			}
			

		  <p className={styles.headerIngredients}>Соберите бургер</p>
		  <section>
			   <div className={styles.TabsBox}>
			   	<Tab value="Buns" active={current === 'Buns'} onClick={setTab}>Булки</Tab>
			   	<Tab value="Sauces" active={current === 'Sauces'} onClick={setTab}>Соусы</Tab>
			   	<Tab value="Fillings" active={current === 'Fillings'} onClick={setTab}>Начинки</Tab>				
			   </div>
			   <div className={styles.ingredientsList}>
			   	{/* Булки */}			   	
					<IngredientList ingredients={arrBun} title='Булки' onOpen={onOpen}/>	   		
			   	{/* Соусы */}
			   	<IngredientList ingredients={arrMain} title='Соусы' onOpen={onOpen}/>		   		
			   	{/* Начинки */}
			   	<IngredientList ingredients={arrSauce} title='Начинки' onOpen={onOpen}/>			
			   </div>
		  </section>

		</div>

	)
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};