import React from 'react';
import styles from './order-details.module.css'
import orderAccpeted from '../../images/orderAccpeted.svg'


const OrderDetails = () => {
	return (
		<div className={`${styles.orderDetails} p-15`}>
		   <p className={`${styles.orderNumber} text_type_digits-large pb-8`}>034536</p>
		   <p className={`text_type_main-medium pb-15`}>идентификатор заказа</p>
		   <img src={orderAccpeted} alt="orderAccpeted"/>
			
			<p className={`pt-15 pb-2`}>Ваш заказ начали готовить</p>
			<p className={`text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

export default OrderDetails;

