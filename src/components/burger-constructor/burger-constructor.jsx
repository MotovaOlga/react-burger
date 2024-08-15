import React, { useRef, useCallback, useState, useEffect, useMemo }from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'
// import data  from '../../utils/data.js';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, deleteIngredient, moveIngredient } from '../../services/actions/burger-constructor'
import { useDrop } from "react-dnd";
import { orderRequest } from '../../services/actions/order-details';
import { v4 as uuidv4 } from 'uuid';
import { BurgerConstructorCard } from './burger-constructor-card/burger-constructor-card'


const BurgerConstructor = () => {
	const dispatch = useDispatch();	 

	// массив игредиентов BurgerConstructor
	const arrBurgerConstructorIngredients = useSelector(state => state.burgerConstructor);

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const onClose = () => {
		setIsModalOpen(false);
	};
	const onOpen = () => {
		if (
			arrBurgerConstructorIngredients &&
			arrBurgerConstructorIngredients.bun &&
			arrBurgerConstructorIngredients.burgerConstructor 
		   ) {
			const {bun, burgerConstructor} = arrBurgerConstructorIngredients;
			const orderIngredients = {				
				ingredients: [
				  bun ? bun._id : null,  // ID из объекта bun, если он существует
				  ...burgerConstructor ? burgerConstructor.map(item => item._id) : [],  // ID из массива burgerConstructor, если он существует
				  bun ? bun._id : null,  // ID из объекта bun, если он существует
				].filter(id => id !== null)  // Удаляем все null значения из массива
			};
			// console.log('orderIngredients.ingredients: ', orderIngredients.ingredients); //отладка

			// Проверка, что массив ингредиентов не пустой
		   if (orderIngredients.ingredients.length > 2) {
		   	dispatch(orderRequest(orderIngredients));
		   	setIsModalOpen(true);
		   } else {
		   	console.log('Добавьте ингредиенты, чтобы создать заказ.');
		   } 
		}	else {
			console.log('Добавьте ингредиенты, чтобы создать заказ.');
		}
	};

	// сумма заказа - обернуть в хук useMemo
	const orderAmount = useMemo(() => {
		const bunPrice = arrBurgerConstructorIngredients.bun ? (arrBurgerConstructorIngredients.bun.price) * 2 : 0;
		const burgerConstructorPrice = Array.isArray(arrBurgerConstructorIngredients.burgerConstructor) 
			 ? arrBurgerConstructorIngredients.burgerConstructor.reduce((total, item) => total + (item.price || 0), 0)
			 : 0;
		// const burgerConstructorPrice = 0; 
		return bunPrice + burgerConstructorPrice;
  }, [arrBurgerConstructorIngredients]);

//   const dispatch = useDispatch();	 
//   const handleDeleteIngredient = (ingredientKey) => {   
// 	  console.log('Deleting ingredient with ID:', ingredientKey);
// 	  dispatch(deleteIngredient(ingredientKey));
//   }

	// DND
	// сортировка
	const moveCard = useCallback((dragIndex, hoverIndex) => {
	//   console.log('moveCard:(dragIndex, hoverIndex)', dragIndex, hoverIndex);
		dispatch(moveIngredient(dragIndex, hoverIndex));
	}, [])
	

	// function dragStartHandler(e, card, dragIndex) {
	// 	console.log('dragStartHandler-ingredient:', card);
	// 	setCurrentCard({ currentCard: card, dragIndex: dragIndex });
	// }
	// function dragEndHandler(e) {
	// }
	// function dragOverHandler(e) {
	// 	e.preventDefault();	
	// 	// e.target.style.background = 'lightgrey';
	// }
	// function dropHandler(e, card, hoverIndex) {
	// 	e.preventDefault();
	// 	// как найти индекс этих элементов
	// 	// console.log('dropHandler-currentCard, dragIndex:', currentCard); // dragIndex. array.indexOf(element)
	// 	// console.log('dropHandler-card, hoverIndex:', card, hoverIndex); // hoverIndex

	// 	// dispatch(moveIngredient(currentCard.dragIndex, hoverIndex));
	// }

	// добавление ингредиентов по клику
	const handleAddIngredient = (ingredient) => {
		// Создаем новый объект ингредиента с уникальным ключом
		const ingredientWithKey = {
			...ingredient,
			key: uuidv4(), // Добавляем уникальный ключ
		};
  
		// console.log('Adding ingredient with unique key:', ingredientWithKey.key);
		dispatch(addIngredient(ingredientWithKey));
  }

	// перетаскивание
	// Хук useDrop работает с целевым элементом(компонент, в который мы перетаскиваем исходный элемент).
		const [{ canDrop, dragItem, isHover }, dropTargetRef] = useDrop(() => ({
		accept: 'ingredientCard', // строка, которая должна быть аналогична свойству type перетаскиваемого компонента.
		drop: (ingredient) => (
			handleAddIngredient(ingredient)
		), // принимает данные перетаскиваемого компонента и monitor. срабатывает при «броске» перетаскиваемого элемента в целевой.
		collect: (monitor) => ({ // набор вычислений для работы с пропсами
			canDrop: monitor.canDrop(), // возвращает булевое значение true в случае, если в этот момент никакой элемент не перетаскивается.
         dragItem: monitor.getItem(),
         isHover: monitor.isOver(),
		}),
	}));


	return(
		<div className={`${styles.burgerConstructor} ml-5 pt-25`}>

			{/* модальное окно */}
			{
				isModalOpen && 
				<Modal onClose={onClose} title={''}>
					<OrderDetails/>
				</Modal>
			}

			{/* constructor box */}
			<div ref={dropTargetRef} className={`${styles.constructorBox}`}>
            <ul>
						   {/* булка-top*/}
							{arrBurgerConstructorIngredients.bun ? (
                        <li key="top">
									<BurgerConstructorCard ingredient={arrBurgerConstructorIngredients.bun}/>
							      {/* <DragIcon />
							      <ConstructorElement
							        className={styles.constructorElement}
							        text={arrBurgerConstructorIngredients.bun.name || 'Выберите булку'}
							        price={arrBurgerConstructorIngredients.bun.price || 0}
							        thumbnail={arrBurgerConstructorIngredients.bun.image_mobile || ''}
							        type="top" 
							        isLocked={true}
							      /> */}
								</li>
                     ) : (
								<li>
								   <ConstructorElement key={'filings'} text={'Выберите булку'} isLocked={true}/>
							   </li>
					      )}
							
                     {/* середина бургера */}
							{arrBurgerConstructorIngredients.burgerConstructor.length > 0 ? (
								arrBurgerConstructorIngredients.burgerConstructor.map((product, index) => {
									//   console.log(`Product at index ${index}:`, product); // Отладка
									//   console.log(`середина бургера - index:`, index); // Отладка
									if(product){
									   return (
											<div >
											   <li 
										         key={product.key} 
										         // draggable={true}
											      // onDragStart={(e) => dragStartHandler(e, product, index)}
											      // onDragLeave={(e) => dragEndHandler(e)}
											      // onDragEnd={(e) => dragEndHandler(e)}
											      // onDragOver={(e) => dragOverHandler(e)}
											      // onDrop={(e) => dropHandler(e, product, index)}
									      	>
									         <BurgerConstructorCard moveCard={moveCard} ingredient={product} index={index}/>
										</li>

											</div>
										
									   );
					         	}})
							):(
								<li>
								   <ConstructorElement key={'bottom'} text={'Выберите начинку'} type="bottom" isLocked={false}/>
							   </li>
							)}
                     
                     {/* булка-bottom*/}
							{arrBurgerConstructorIngredients.bun ? (
								<li key="bottom">
									<BurgerConstructorCard ingredient={arrBurgerConstructorIngredients.bun}/>
                           {/* <DragIcon />
                           <ConstructorElement
                           className={styles.constructorElement}
                           text={arrBurgerConstructorIngredients.bun.name || 'Выберите булку'}
                           price={arrBurgerConstructorIngredients.bun.price || 0}
                           thumbnail={arrBurgerConstructorIngredients.bun.image_mobile || ''}
								   type="bottom" 
                           isLocked={true}
                           /> */}
                        </li>
                     ) : (
								<li>
								   <ConstructorElement key={'bottom'} text={'Выберите булку'} type="bottom" isLocked={true}/>
							   </li>
					      )}
            </ul>
         </div>

			{/* сумма заказа */}
			<div className={`${styles.orderPrice} mr-4 mt-10 mb-10`}>
				<div className={`text_type_digits-medium`}>
				   <span>{orderAmount}</span>
				</div>
				<div>
				   <CurrencyIcon type="primary"/>
				</div>
				<div className={`ml-10`}>
				   <Button type="primary" size="medium" onClick={onOpen}>Оформить заказ</Button> 
				</div>
			</div>

		</div>
	)
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerConstructor;
