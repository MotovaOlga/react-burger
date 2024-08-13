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
import { addCurrentIngredient, clearCurrentIngredient } from '../../services/actions/ingredient-details'
import { v4 as uuidv4 } from 'uuid';
import { DropTargetMonitor, useDrop } from "react-dnd";


const BurgerIngredients = ({ ingredients }) => {
	const dispatch = useDispatch();	 
	// массив игредиентов BurgerConstructor
	const arrBurgerConstructorIngredients = useSelector(state => state.burgerConstructor);
	
	const [currentTab, setCurrentTab] = React.useState('Buns');
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	// const [currentIngredient, setCurrentIngredient] = useState(null);

	const arrBun = useMemo(() => ingredients.filter(product => product.type === 'bun'));
	const arrMain = useMemo(() => ingredients.filter((product) => product.type === 'main'));
	const arrSauce = useMemo(() => ingredients.filter((product) => product.type === 'sauce'));

	// функции модального окна close/open 
	// после close ощищаем стор-ingredientDetails
	const onClose = () => {
		setIsModalOpen(false);
		dispatch(clearCurrentIngredient());
	};
	// при open найти ингридиент по id и передать его в стор-ingredientDetails объект currentIngredient
	const onOpen = (id) => {
		//надо найти в api этот ингредиент с заданым id
		const currentIngredient = ingredients.find((product) => product._id === id);
		// console.log('currentIngredient: ', currentIngredient); // отладка
		dispatch(addCurrentIngredient(currentIngredient));

		setIsModalOpen(true);
	};

	// добавление ингредиентов по клику
	const handleAddIngredient = (ingredient) => {
		// Создаем новый объект ингредиента с уникальным ключом
		const ingredientWithKey = {
			...ingredient,
			key: uuidv4() // Добавляем уникальный ключ
		};
  
		console.log('Adding ingredient with unique key:', ingredientWithKey.key);
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

	// подсчет выбранных ингредиентов
	const getIngredientCount = (ingredient) => {
		if (ingredient.type === 'bun') {
		  return arrBurgerConstructorIngredients.bun && arrBurgerConstructorIngredients.bun._id === ingredient._id ? 2 : 0;
		} else {
			if (
				arrBurgerConstructorIngredients.burgerConstructor &&
				arrBurgerConstructorIngredients.burgerConstructor.length > 0
		  ) {
			 const ingredientId = ingredient._id;
			 const count = arrBurgerConstructorIngredients.burgerConstructor.filter(
				(item) => item._id === ingredientId
			 ).length;
			 return count;
		  }
		  return 0;
		}
	};


	// const [{ canDrop, dragItem, isHover }, dropTarget] = useDrop<
   // 	IIngredient,
   // 	unknown,
   // 	{ canDrop: boolean; dragItem: IIngredient; isHover: boolean } >
	//    ({
   // 	accept: "items",
   // 	drop(item: IIngredient) {
   // 	  console.log(item)
   // 	  dispatch(addIngredient(item));
   // 	},
   // 	collect: (monitor: DropTargetMonitor) => ({
   // 	  canDrop: monitor.canDrop(),
   // 	  dragItem: monitor.getItem(),
   // 	  isHover: monitor.isOver(),
   // 	}),
   // });

	

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
					<IngredientList headerId="Buns"  headerRef={bunRef}  ingredients={arrBun} title='Булки' onOpen={onOpen} addIngOnDblclick={handleAddIngredient} getIngredientCount={getIngredientCount}/>	  
					{/* Начинки */}
			   	<IngredientList headerId="Fillings" headerRef={sauceRef} ingredients={arrSauce} title='Начинки' onOpen={onOpen} addIngOnDblclick={handleAddIngredient} getIngredientCount={getIngredientCount}/>	 		
			   	{/* Соусы */}
			   	<IngredientList headerId="Sauces" headerRef={mainRef} ingredients={arrMain} title='Соусы' onOpen={onOpen} addIngOnDblclick={handleAddIngredient} getIngredientCount={getIngredientCount}/>		   		
			   </div>
		  </section>
		</div>
	)
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerIngredients;
