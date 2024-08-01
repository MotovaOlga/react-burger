import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { Tab }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import IngredientList from './ingredient-list/ingredient-list'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'


const BurgerIngredients = ({ ingredients }) => {
	const [current, setCurrent] = React.useState('Buns');
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [currentIngredient, setСurrentIngredient] = useState(null);

	const onClose = () => {
		setIsModalOpen(false);
	};

	function onOpen (id) {
		//надо найти в api этот ингредиент с заданым id
		const details = ingredients.filter((product) => product._id === id);
		if (details.length > 0) {
			setСurrentIngredient(details[0]); // Передаем весь объект details
		}
		setIsModalOpen(true);
	};

	const arrBun = ingredients.filter((product) => product.type === 'bun');
	const arrMain= ingredients.filter((product) => product.type === 'main');
	const arrSauce=ingredients.filter((product) => product.type === 'sauce');

	const setTab = (tab) => {
		setCurrent(tab);
	};

	return(
		<div className={`${styles.burgerIngredients} mr-5`}>
			
			{/* модальное окно */}
			{
				isModalOpen && 
				<Modal onClose={onClose} title={'Детали ингредиента'} value={currentIngredient}>
					<IngredientDetails currentIngredient={currentIngredient}/>
				</Modal>
			}

		  <p className={`${styles.headerIngredients} text_type_main-large mt-10`}>Соберите бургер</p>
		  <section>
			   <div className={`${styles.TabsBox} mt-5`}>
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

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
