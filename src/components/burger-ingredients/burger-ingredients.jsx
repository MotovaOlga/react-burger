import React, {useState, useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { Tab }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import IngredientList from './ingredient-list/ingredient-list'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'


const BurgerIngredients = ({ ingredients }) => {
	const [currentTab, setCurrentTab] = React.useState('Buns');
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [currentIngredient, setCurrentIngredient] = useState(null);

	const onClose = () => {
		setIsModalOpen(false);
	};
 
	function onOpen (id) {
		//надо найти в api этот ингредиент с заданым id
		const details = ingredients.find(product => product._id === id);
		if (details.length > 0) {
			setCurrentIngredient(details); // Передаем details
		}
		setIsModalOpen(true);
	};

	const arrBun = ingredients.filter((product) => product.type === 'bun');
	const arrMain= ingredients.filter((product) => product.type === 'main');
	const arrSauce=ingredients.filter((product) => product.type === 'sauce');

	// переключение табов
	const lineRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	console.log(lineRef);
 
	const handleScroll = () => { 
		if (lineRef.currentTab && bunRef.currentTab && sauceRef.currentTab && mainRef.currentTab) {
			const bunDistance = Math.abs(
			  lineRef.currentTab.getBoundingClientRect().bottom -
			  bunRef.currentTab.getBoundingClientRect().top
			);
			const sauceDistance = Math.abs(
			  lineRef?.currentTab.getBoundingClientRect().bottom -
			  sauceRef?.currentTab.getBoundingClientRect().top
			);
			const mainDistance = Math.abs(
			  lineRef?.currentTab.getBoundingClientRect().bottom -
			  mainRef?.currentTab.getBoundingClientRect().top
			);
			const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
			const currentHeader =
			  minDistance === bunDistance
				 ? 'bread'
				 : minDistance === sauceDistance
					? 'sauces'
					: 'fillings';
			setCurrentTab((prevState) => currentHeader === prevState ? prevState : currentHeader);
		}
	};

	console.log(`#${currentTab}`);
	useEffect(() => {
		document.querySelector(`#${currentTab}`)?.scrollIntoView({ behavior: 'smooth' });
	}, [currentTab]);

	const setTab = (tab) => {
	   console.log(tab);
		setCurrentTab(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
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
			   <div className={`${styles.TabsBox} mt-5`} ref={lineRef}>
			   	<Tab value="Buns" active={currentTab === 'Buns'} onClick={setTab}>Булки</Tab>
					<Tab value="Fillings" active={currentTab === 'Fillings'} onClick={setTab}>Начинки</Tab>	
			   	<Tab value="Sauces" active={currentTab === 'Sauces'} onClick={setTab}>Соусы</Tab>
			   </div>
			   <div className={styles.ingredientsList}>
			   	{/* Булки */}			   	
					<IngredientList ref={bunRef}  ingredients={arrBun} title='Булки' onScroll={handleScroll} onOpen={onOpen}/>	  
					{/* Начинки */}
			   	<IngredientList  ref={sauceRef} ingredients={arrSauce} title='Начинки' onScroll={handleScroll} onOpen={onOpen}/>	 		
			   	{/* Соусы */}
			   	<IngredientList ref={mainRef} ingredients={arrMain} title='Соусы' onScroll={handleScroll} onOpen={onOpen}/>		   		
			   </div>
		  </section>

		</div>
	)
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
