import React, {useState, useEffect, useRef, useMemo} from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { Tab }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import IngredientList from './ingredient-list/ingredient-list'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, deleteIngredient, moveIngredient } from '../../services/actions/burger-constructor'
import { v4 as uuidv4 } from 'uuid';


const BurgerIngredients = ({ ingredients }) => {
	const [currentTab, setCurrentTab] = React.useState('Buns');
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [currentIngredient, setCurrentIngredient] = useState(null);

	const arrBun = useMemo(() => ingredients.filter(product => product.type === 'bun'));
	const arrMain = useMemo(() => ingredients.filter((product) => product.type === 'main'));
	const arrSauce = useMemo(() => ingredients.filter((product) => product.type === 'sauce'));

	// функции модального окна close/open
	const onClose = () => {
		setIsModalOpen(false);
	};
 
	const onOpen = (id) => {
		//надо найти в api этот ингредиент с заданым id
		let details = ingredients.find((product) => product._id === id);
		console.log('details: ', details); // отладка

		if (!details) {
			console.log('Details not found'); // отладка
			// Используем значение по умолчанию для details
			setCurrentIngredient({name: '', price: 0, image_mobile: ''});
	  } else {
			setCurrentIngredient(details);
	  }
		setIsModalOpen(true);
	};

	// добавление ингредиентов по клику
	const dispatch = useDispatch();	 
	// const handleAddIngredient = (ingredient) => {
	// 	console.log('Deleting ingredient with ID:', ingredient);
	// 	dispatch(addIngredient(ingredient));
	// }
	const handleAddIngredient = (ingredient) => {
		// Создаем новый объект ингредиента с уникальным ключом
		const ingredientWithKey = {
			 ...ingredient,
			 uniqueKey: uuidv4() // Добавляем уникальный ключ
		};
  
		console.log('Adding ingredient with unique key:', ingredientWithKey.uniqueKey);
		dispatch(addIngredient(ingredientWithKey));
  }

	// переключение табов
	const lineRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);
 
	const handleScroll = () => { 
		if (lineRef.current && bunRef.current && sauceRef.current && mainRef.current) {
			const bunDistance = Math.abs(
			  lineRef.current.getBoundingClientRect().bottom -
			  bunRef.current.getBoundingClientRect().top
			); 
			const sauceDistance = Math.abs(
			  lineRef?.current.getBoundingClientRect().bottom -
			  sauceRef?.current.getBoundingClientRect().top
			);
			const mainDistance = Math.abs(
			  lineRef?.current.getBoundingClientRect().bottom -
			  mainRef?.current.getBoundingClientRect().top
			);
			const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
			const currentHeader =
			  minDistance === bunDistance
				 ? 'Buns'
				 : minDistance === sauceDistance
					? 'Fillings'
					: 'Sauces';
			setCurrentTab((prevState) => currentHeader === prevState ? prevState : currentHeader);
		}
	};

	const setTab = (tab) => {
		setCurrentTab(tab);
		const element = document.querySelector(`#${tab}`);
		if (element) element.scrollIntoView({ behavior: "smooth", block: "start"  });
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

			   	<Tab active={currentTab === 'Buns'} onClick={()=>setTab("Buns")}>Булки</Tab>
					<Tab active={currentTab === 'Fillings'} onClick={()=>setTab("Fillings")}>Начинки</Tab>	
			   	<Tab active={currentTab === 'Sauces'} onClick={()=>setTab("Sauces")}>Соусы</Tab>
			   </div>
			   <div className={styles.ingredientsList} onScroll={()=>handleScroll()}>
			   	{/* Булки */}			   	
					<IngredientList headerId="Buns"  headerRef={bunRef}  ingredients={arrBun} title='Булки' onOpen={onOpen} addIngOnDblclick={handleAddIngredient}/>	  
					{/* Начинки */}
			   	<IngredientList headerId="Fillings" headerRef={sauceRef} ingredients={arrSauce} title='Начинки' onOpen={onOpen} addIngOnDblclick={handleAddIngredient}/>	 		
			   	{/* Соусы */}
			   	<IngredientList headerId="Sauces" headerRef={mainRef} ingredients={arrMain} title='Соусы' onOpen={onOpen} addIngOnDblclick={handleAddIngredient}/>		   		
			   </div>
		  </section>
		</div>
	)
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
