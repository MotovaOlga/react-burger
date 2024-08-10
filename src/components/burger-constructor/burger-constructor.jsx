import React, { useState, useEffect }from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'
// import data  from '../../utils/data.js';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useSelector } from 'react-redux'


const BurgerConstructor = () => {
	const [arrBurgerConstructorIngredients, setArrBurgerConstructorIngredients] = useState([]);
	const [bunsTopBottom, setBunsTopBottom] = useState(null);
	const [arrMainPart, setArrMainPart] = useState([]);
	const orderNumber = '034536';

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const onClose = () => {
		setIsModalOpen(false);
	};
	const onOpen = () => {
		setIsModalOpen(true);
	};

	// массив игредиентов BurgerConstructor
	// setArrBurgerConstructorIngredients(useSelector(state => state.ingredients.ingredients)); 
	// setArrBurgerConstructorIngredients(useSelector(state => state.burgerConstructor.burgerConstructor)); 
	// console.log(`arrBurgerConstructorIngredients: ${arrBurgerConstructorIngredients}`)
	// console.log(`typeof arrBurgerConstructorIngredients: ${typeof arrBurgerConstructorIngredients}`)
	
	// useEffect не работает
	useEffect(() => {
		console.log(`useEffect`);

		if (arrBurgerConstructorIngredients.length !== 0) {
		  setBunsTopBottom(arrBurgerConstructorIngredients[0]);
		  setArrMainPart(arrBurgerConstructorIngredients.slice(1, -1));
	     console.log(`bunsTopBottom: ${bunsTopBottom}`)
	     console.log(`arrMainPart: ${arrMainPart}`)
		}
		else {
			console.log(`else`);
		 }
	}, [arrBurgerConstructorIngredients]);

	// сумма заказа
	const calculateOrderAmount = (arr) => {
		const amount = arr.reduce((total, ingredient) => total + ingredient.price, 0);
	   // console.log(`amount: ${amount}`)
		return amount;
	};
   const orderAmount = calculateOrderAmount(arrBurgerConstructorIngredients);


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
                       <DragIcon />
                       <ConstructorElement text={'Выберите булку'} isLocked={true}/>
                     </li>
                     <li>
                       <DragIcon />
                       <ConstructorElement text={'Выберите начинку'} isLocked={false}/>
                     </li>
                     <li>
                       <DragIcon />
                       <ConstructorElement text={'Выберите булку'} isLocked={true}/>
                     </li>
                  </>
               ) : (
                  <>
                     {/* Отображаем первый элемент (bunsTopBottom) */}
                     <li key="top">
                       <DragIcon />
                       <ConstructorElement
                         className={styles.constructorElement}
                         text={bunsTopBottom.name}
                         price={bunsTopBottom.price}
                         thumbnail={bunsTopBottom.image_mobile}
                         isLocked={true}
                       />
                     </li>
                     
                     {/* Отображаем основной контент */}
                     {arrMainPart.map(product => (
                       <li key={product.id}>
                         <DragIcon />
                         <ConstructorElement
                           className={styles.constructorElement}
                           text={product.name}
                           price={product.price}
                           thumbnail={product.image_mobile}
                           isLocked={false}
                         />
                       </li>
                     ))}
                     
                     {/* Отображаем последний элемент (bunsTopBottom) */}
                     <li key="bottom">
                       <DragIcon />
                       <ConstructorElement
                         className={styles.constructorElement}
                         text={bunsTopBottom.name}
                         price={bunsTopBottom.price}
                         thumbnail={bunsTopBottom.image_mobile}
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
