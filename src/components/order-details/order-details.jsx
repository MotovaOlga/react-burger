import React, { useState, useEffect, useMemo }from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './order-details.module.css'
import orderAccpeted from '../../images/orderAccpeted.svg'
// import { orderRequest } from '../../services/actions/order-details';


const OrderDetails = () => {
	//надо получить номер заказа
	const dispatch = useDispatch();	
	const arrBurgerConstructorIngredients = useSelector(state => state.burgerConstructor);
	// const orderIngredients = {
	// 	ingredients: [
	// 	   arrBurgerConstructorIngredients.bun._id,  // ID из объекта bun
	// 	   ...arrBurgerConstructorIngredients.burgerConstructor.map(item => item._id),  // ID из массива burgerConstructor
	// 	   arrBurgerConstructorIngredients.bun._id,  // ID из объекта bun
	// 	]
	// };
	// console.log('orderIngredients.ingredients: ', orderIngredients.ingredients); //отладка

	// не создавать заказ пока массив пуст или нет булок
	const order = useSelector(state => state.orderDetails.order); // Получаем состояние из Redux
	const [orderNumber, setOrderNumber] = useState(null); 

	// useEffect(() => {
	// 	// if(orderIngredients.ingredients.length < 2){
	// 	// 	console.log('выберите булку и начинки'); //отладка
	// 	// } else {
	// 	// 	console.log('orderRequest'); //отладка
	// 	// 	dispatch(orderRequest(orderIngredients));	
	// 	// }
	// 	console.log('orderRequest'); //отладка
	// 	dispatch(orderRequest(orderIngredients));

   // }, [orderIngredients.ingredients, dispatch]);
	// console.log('order:', order); //отладка

	// const func1 = () => {
	// 	dispatch(orderRequest(orderIngredients));
	// }
	// dispatch(orderRequest(orderIngredients));
	// console.log('order:', order); //отладка

	useEffect(() => {
		if (order) {
			setOrderNumber(order.order.number);
		}
	}, [order]);
	console.log('orderNumber:', orderNumber); //отладка

	return (
		<div className={`${styles.orderDetails} p-15`}>

		   <p className={`${styles.orderNumber} text_type_digits-large pb-8`}>{orderNumber}</p>

		   <p className={`text_type_main-medium pb-15`}>идентификатор заказа</p>
		   <img src={orderAccpeted} alt="orderAccpeted"/>
			
			<p className={`pt-15 pb-2`}>Ваш заказ начали готовить</p>
			<p className={`text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

export default OrderDetails;

