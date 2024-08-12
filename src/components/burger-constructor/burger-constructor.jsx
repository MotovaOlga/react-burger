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
import { DropTargetMonitor, useDrop } from "react-dnd";


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
		<div className={`${styles.burgerConstructor} ml-5 pt-25`}>

			{/* модальное окно */}
			{
				isModalOpen && 
				<Modal onClose={onClose} title={''}>
					<OrderDetails/>
				</Modal>
			}

			{/* constructor box */}
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
										<li key={product.key} >
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
