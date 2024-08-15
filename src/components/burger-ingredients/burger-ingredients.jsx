import React, { useRef} from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { Tab }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import IngredientList from './ingredient-list/ingredient-list'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentIngredient, clearCurrentIngredient } from '../../services/actions/ingredient-details'


const BurgerIngredients = ({ ingredients }) => {
	const dispatch = useDispatch();	 
	// массив игредиентов BurgerConstructor
	const arrBurgerConstructorIngredients = useSelector(state => state.burgerConstructor);
	
	const [currentTab, setCurrentTab] = React.useState('Buns');
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const arrBun = ingredients.filter(product => product.type === 'bun');
	const arrMain = ingredients.filter(product => product.type === 'main');
	const arrSauce = ingredients.filter(product => product.type === 'sauce');

	// функции модального окна close/open 
	// после close ощищаем стор-ingredientDetails
	const onClose = () => {
		setIsModalOpen(false);
		dispatch(clearCurrentIngredient());
	};
	// при open найти ингридиент по id и передать его в стор-ingredientDetails объект currentIngredient
	const onOpen = (id) => {
		//надо найти в api этот ингредиент с заданым id
		if (id) {
			const currentIngredient = ingredients.find((item) => item._id === id);
		   // console.log('currentIngredient: ', currentIngredient); // отладка
		   dispatch(addCurrentIngredient(currentIngredient));

			setIsModalOpen(true);
		}
	};

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

	// подсчет выбранных ингредиентов
	const getIngredientCount = (ingredient) => {
		if (!ingredient || !ingredient._id) return 0; // Если ingredient не определён, возвращаем 0
	  
		const { bun, burgerConstructor } = arrBurgerConstructorIngredients || {};

		if (ingredient.type === 'bun') {
		  return bun && bun._id === ingredient._id ? 2 : 0;
		} else {
			if ( burgerConstructor &&	burgerConstructor.length > 0 ) {
				const ingredientId = ingredient._id;
				// const count = burgerConstructor.filter((item) => item._id === ingredientId).length;
				return burgerConstructor.filter(item => item._id === ingredientId).length;
				// return 110;
		   }
		  return 0;
		}
	};

	
	return(
		<div className={`${styles.burgerIngredients} mr-5` }>
			
			{/* модальное окно */}
			{
				isModalOpen && 
				<Modal onClose={onClose} title={'Детали ингредиента'}>
					<IngredientDetails/>
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
					<IngredientList headerId="Buns"  headerRef={bunRef}  ingredients={arrBun? arrBun : []} title='Булки' onOpen={onOpen} getIngredientCount={getIngredientCount}/>	  
					{/* Начинки */}
			   	<IngredientList headerId="Fillings" headerRef={sauceRef} ingredients={arrSauce? arrSauce : []} title='Начинки' onOpen={onOpen} getIngredientCount={getIngredientCount}/>	 		
			   	{/* Соусы */}
			   	<IngredientList headerId="Sauces" headerRef={mainRef} ingredients={arrMain? arrMain : []} title='Соусы' onOpen={onOpen} getIngredientCount={getIngredientCount}/>		   		
			   </div>
		  </section>
		</div>
	)
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
