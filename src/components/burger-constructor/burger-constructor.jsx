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
	const arrMainPart = useSelector(state => state.burgerConstructor.burgerConstructor);
	const bunsTopBottom = useSelector(state => state.burgerConstructor.bun);
	const arrBurgerConstructorIngredients = bunsTopBottom ? [bunsTopBottom, ...arrMainPart] : [...arrMainPart];
	
	const orderNumber = '034536';

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const onClose = () => {
		setIsModalOpen(false);
	};
	const onOpen = () => {
		setIsModalOpen(true);
	};

	// сумма заказа - обернуть в хук useMemo
	const orderAmount = useMemo(() => {
		const bunPrice = bunsTopBottom ? (bunsTopBottom.price)*2 : 0;
		const arrMainPartPrice = arrMainPart.reduce((total, ingredient) => total + ingredient.price, 0);
		return bunPrice + arrMainPartPrice;
	 }, [bunsTopBottom, arrMainPart]);

	const dispatch = useDispatch();	 
	const handleDeleteIngredient = (ingredientId) => {   
		console.log('Deleting ingredient with ID:', ingredientId);
		dispatch(deleteIngredient(ingredientId));
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
				<Modal onClose={onClose} title={''} value={orderNumber}>
					<OrderDetails/>
				</Modal>
			}

			{/* constructor box */}
			<div className={`${styles.constructorBox}`}>
            <ul>
              {arrBurgerConstructorIngredients.length === 0 ? (
                  <>
                     <li>
                       <ConstructorElement key={'top'} text={'Выберите булку'} type="top" isLocked={true}/>
                     </li>
							<li>
                       <ConstructorElement key={'1'} text={'Выберите начинку'} isLocked={false} handleClose={()=> {handleDeleteIngredient('1')}}/>
                     </li>
                     <li>
                       <ConstructorElement key={'bottom'} text={'Выберите булку'} type="bottom" isLocked={true}/>
                     </li>
                  </>
               ) : (
                  <>
						   {/* булка-top*/}
                     <li key="top">
                        <DragIcon />
                        <ConstructorElement
                          className={styles.constructorElement}
                          text={bunsTopBottom.name || 'Выберите булку'}
                          price={bunsTopBottom.price || 0}
                          thumbnail={bunsTopBottom.image_mobile || ''}
							 	  type="top" 
                          isLocked={true}
                        />
                     </li>

                     {/* середина бургера */}
							{arrMainPart.map((product, index) => {
                     //   console.log(`Product at index ${index}:`, product); // Отладка
                       return (
                        <li key={product.uniqueKey} >
                           <DragIcon />
                           <ConstructorElement
                           className={styles.constructorElement}
                           text={product.name || 'Выберите начинку'}
                           price={product.price || 0}
                           thumbnail={product.image_mobile || ''}
                           isLocked={false}
									handleClose={()=>handleDeleteIngredient(product._id)}
                           />
                        </li>
                       );
                     })}
                     
                     {/* булка-bottom*/}
                     <li key="bottom">
                        <DragIcon />
                        <ConstructorElement
                          className={styles.constructorElement}
                          text={bunsTopBottom.name || 'Выберите булку'}
                          price={bunsTopBottom.price || 0}
                          thumbnail={bunsTopBottom.image_mobile || ''}
								  type="bottom" 
                          isLocked={true}
                        />
                     </li>
                  </>
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
