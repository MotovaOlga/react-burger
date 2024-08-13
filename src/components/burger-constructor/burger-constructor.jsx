import React, { useState, useEffect, useMemo }from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'
// import data  from '../../utils/data.js';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, deleteIngredient, moveIngredient } from '../../services/actions/burger-constructor'
// import { DropTargetMonitor, useDrop } from "react-dnd";
// import { DropTargetMonitor, useDrop } from "react-dnd";


const BurgerConstructor = () => {
	// массив игредиентов BurgerConstructor
	const arrBurgerConstructorIngredients = useSelector(state => state.burgerConstructor);
	console.log('arrBurgerConstructorIngredients ', arrBurgerConstructorIngredients);


	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const onClose = () => {
		setIsModalOpen(false);
	};
	const onOpen = () => {
		setIsModalOpen(true);
	};

	// сумма заказа - обернуть в хук useMemo
	const orderAmount = useMemo(() => {
		const bunPrice = arrBurgerConstructorIngredients.bun ? (arrBurgerConstructorIngredients.bun.price)*2 : 0;
		const burgerConstructorPrice = arrBurgerConstructorIngredients.burgerConstructor.reduce((total, ingredient) => total + ingredient.price, 0);
		return bunPrice + burgerConstructorPrice;
	 }, [arrBurgerConstructorIngredients]);

	const dispatch = useDispatch();	 
	const handleDeleteIngredient = (ingredientKey) => {   
		console.log('Deleting ingredient with ID:', ingredientKey);
		dispatch(deleteIngredient(ingredientKey));
	}

	// DND
	const [currentCard, setCurrentCard] = useState({ currentCard: null, dragIndex: null });

	function dragStartHandler(e, card, dragIndex) {
		console.log('dragStartHandler-ingredient:', card);
		setCurrentCard({ currentCard: card, dragIndex: dragIndex });
		// return(e);
	}
	function dragEndHandler(e) {
		// return(e);
	}
	function dragOverHandler(e) {
		e.preventDefault();	
		// e.target.style.background = 'lightgrey';
		// return(e);
	}
	function dropHandler(e, card, hoverIndex) {
		e.preventDefault();
		// как найти индекс этих элементов
		console.log('dropHandler-currentCard, dragIndex:', currentCard); // dragIndex. array.indexOf(element)
		console.log('dropHandler-card, hoverIndex:', card, hoverIndex); // hoverIndex
		
		// где-то нам надо записать порядок карточек, чтобы мы могла их сортировать index
		// мы должны моменять порядок карточек. которая была ниже становиться на место верхней.
		// а верхняя ставиться на одну ниже
		dispatch(moveIngredient(currentCard.dragIndex, hoverIndex));

		// return(e);
	}




	// Хук useDrop работает с целевым элементом(компонент, в который мы перетаскиваем исходный элемент).
	// const [{ canDrop, dragItem, isHover }, dropTargetRef] = useDrop(() => ({
	// 	accept: 'ingredient', // строка, которая должна быть аналогична свойству type перетаскиваемого компонента.
	// 	drop: (item) => (
	// 		dispatch(addIngredient(item))
	// 	), // принимает в качестве параметра item перетаскиваемого компонента и monitor. срабатывает при «броске» перетаскиваемого элемента в целевой.
	// 	collect: (monitor) => ({ // набор вычислений для работы с пропсами
	// 		canDrop: monitor.canDrop(), // возвращает булевое значение true в случае, если в этот момент никакой элемент не перетаскивается.
	// 		isHover: monitor.isOver(),
	// 		// dragItem: monitor.getItem(),
	// 	}),
	// }));

	// const moveItem = useCallback(
	// 	(dragIndex, hoverIndex) => {
	// 	  dispatch(moveIngredient(dragIndex, hoverIndex));
	// 	},
	// 	[dispatch]
	//  );


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
			{/* ref={dropTargetRef}  */}
			<div className={`${styles.constructorBox}`}>
            <ul>
						   {/* булка-top*/}
							{arrBurgerConstructorIngredients.bun ? (
                        <li key="top">
							      <DragIcon />
							      <ConstructorElement
							        className={styles.constructorElement}
							        text={arrBurgerConstructorIngredients.bun.name || 'Выберите булку'}
							        price={arrBurgerConstructorIngredients.bun.price || 0}
							        thumbnail={arrBurgerConstructorIngredients.bun.image_mobile || ''}
							      	type="top" 
							        isLocked={true}
							      />
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
									  return (
										<li 
										   key={product.key} 
										   draggable={true}
											onDragStart={(e) => dragStartHandler(e, product, index)}
											onDragLeave={(e) => dragEndHandler(e)}
											onDragEnd={(e) => dragEndHandler(e)}
											onDragOver={(e) => dragOverHandler(e)}
											onDrop={(e) => dropHandler(e, product, index)}
										>
											<DragIcon />
											<ConstructorElement
											className={styles.constructorElement}
											text={product.name || 'Выберите начинку'}
											price={product.price || 0}
											thumbnail={product.image_mobile || ''}
											isLocked={false}
											handleClose={()=>handleDeleteIngredient(product.key)}
											/>
										</li>
									  );
									})
							):(
								<li>
								<ConstructorElement key={'bottom'} text={'Выберите начинку'} type="bottom" isLocked={false}/>
							</li>
							)}
                     
                     {/* булка-bottom*/}
							{arrBurgerConstructorIngredients.bun ? (
								<li key="bottom">
                           <DragIcon />
                           <ConstructorElement
                           className={styles.constructorElement}
                           text={arrBurgerConstructorIngredients.bun.name || 'Выберите булку'}
                           price={arrBurgerConstructorIngredients.bun.price || 0}
                           thumbnail={arrBurgerConstructorIngredients.bun.image_mobile || ''}
								   type="bottom" 
                           isLocked={true}
                           />
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
