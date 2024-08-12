import React, { useState, useEffect, useMemo }from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './order-details.module.css'
import orderAccpeted from '../../images/orderAccpeted.svg'
import { orderRequest } from '../../services/actions/order-details';


const OrderDetails = () => {
	//надо получить номер заказа
	// { ingredients : ["60666c42cc7b410027a1a9b1", "609646e4dc916e00276b286e","609646e4dc916e00276b2870", "60666c42cc7b410027a1a9b1"] }
	// const orderNumber = '034536';
	const dispatch = useDispatch();	
	

	const [orderNumber, setOrderNumber] = useState('1234567890'); 
	
	const orderIngredients = { 'ingredients': ["60666c42cc7b410027a1a9b1", "609646e4dc916e00276b286e", "609646e4dc916e00276b2870", "60666c42cc7b410027a1a9b1"] };
	useEffect(() => {
		console.log('orderRequest');
	   dispatch(orderRequest(orderIngredients));		
   }, []);

	const order = useSelector(state => state.orderDetails.orderDetails.order); // Получаем состояние из Redux
	console.log('order:', order);

	useEffect(() => {
		if (order) {
			setOrderNumber(order.orderNumber); // Убедитесь, что вы используете правильное имя свойства
		}
   }, [order]);
	console.log('orderNumber:', orderNumber);

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

