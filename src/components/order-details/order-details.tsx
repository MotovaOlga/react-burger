import { FC, useState, useEffect }from 'react';
import { useSelector } from 'react-redux'
import styles from './order-details.module.css'
import orderAccpeted from '../../images/orderAccpeted.svg'
import { IRootState } from '../../utils/types';


const OrderDetails: FC = () => {
	const order = useSelector((state: IRootState) => state.orderDetails.order); // Получаем состояние из Redux
	const [orderNumber, setOrderNumber] = useState<number | null>(null); 

	useEffect(() => {
		if (order) {
			setOrderNumber(order.order.number);
		}
	}, [order]);

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

