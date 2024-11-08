import React, { FC, useState,  useRef, useMemo } from 'react';
import { Tab }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import IngredientList from './ingredient-list/ingredient-list'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentIngredient, clearCurrentIngredient } from '../../services/actions/ingredient-details'
import { IRootState, IIngredient } from '../../utils/types';


const BurgerIngredients: FC = () => { 
	const dispatch = useDispatch();	 	
	const ingredients = useSelector((state: IRootState) => state.ingredients.ingredients); 
	// массив игредиентов BurgerConstructor
	const arrBurgerConstructorIngredients = useSelector((state: IRootState) => state.burgerConstructor);	
	const [currentTab, setCurrentTab] = useState<string>('Buns');

	const arrBun = useMemo(() => ingredients.filter((product: IIngredient) => product.type === 'bun'),[ingredients]);
	const arrMain = useMemo(() => ingredients.filter((product: IIngredient) => product.type === 'main'),[ingredients]);
	const arrSauce = useMemo(() => ingredients.filter((product: IIngredient) => product.type === 'sauce'),[ingredients]);

	// при open найти ингридиент по id и передать его в стор-ingredientDetails объект currentIngredient
	const onOpen = (id: string) => {
		//надо найти в api этот ингредиент с заданым id
		if (id) {
			const currentIngredient = ingredients.find((item) => item._id === id);
		   dispatch(addCurrentIngredient(currentIngredient));
		}
	};

	// переключение табов
	const lineRef = useRef<HTMLDivElement>(null);
	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);
 
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

	const setTab = (tab: string) => {
		setCurrentTab(tab);
		const element = document.querySelector(`#${tab}`);
		if (element) element.scrollIntoView({ behavior: "smooth", block: "start"  });
	};

	// подсчет выбранных ингредиентов
	const getIngredientCount = (ingredient: IIngredient) => {
		if (!ingredient || !ingredient._id) return 0; // Если ingredient не определён, возвращаем 0
	  
		const { bun, burgerConstructor } = arrBurgerConstructorIngredients || {};

		if (ingredient.type === 'bun') {
		  return bun && bun._id === ingredient._id ? 2 : 0;
		} else {
			if ( burgerConstructor &&	burgerConstructor.length > 0 ) {
				const ingredientId = ingredient._id;
				return burgerConstructor.filter(item => item._id === ingredientId).length;
		   }
		  return 0;
		}
	};

	
	return(
		<div className={`${styles.burgerIngredients} mr-5 ml-5` }>

		  <p className={`${styles.headerIngredients} text_type_main-large mt-10`}>Соберите бургер</p>
		  <section>
			   <div className={`${styles.TabsBox} mt-5`} ref={lineRef}>

			   	<Tab value='Buns' active={currentTab === 'Buns'} onClick={()=>setTab("Buns")}>Булки</Tab>
					<Tab value='Fillings' active={currentTab === 'Fillings'} onClick={()=>setTab("Fillings")}>Начинки</Tab>	
			   	<Tab value='Sauces' active={currentTab === 'Sauces'} onClick={()=>setTab("Sauces")}>Соусы</Tab>
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

export default BurgerIngredients;
