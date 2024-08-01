import React from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'
// import data  from '../../utils/data.js';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'

const BurgerConstructor = ({ ingredients }) => {
	const bun = ingredients.filter((product) => product.type === 'bun')[0] || {};
	const main1 = ingredients.filter((product) => product.type === 'main')[0] || {};
	const main2 = ingredients.filter((product) => product.type === 'main')[1] || {};
	const sauce = ingredients.filter((product) => product.type === 'sauce')[0] || {};
	const orderNumber = '034536';

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const onClose = () => {
		setIsModalOpen(false);
	};
	const onOpen = () => {
		setIsModalOpen(true);
	};

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
				{/* булка-top*/}
				<div className={`mr-10`}>
					<ConstructorElement text={bun.name} price={bun.price} thumbnail={bun.image_mobile} type="top" isLocked={true} />
				</div>
            
				{/* середина бургера */}
				<div className={`${styles.constructorBox} pl-4 pr-4`}>
					<ul>
						<li>
						   <DragIcon/>
						   <ConstructorElement className={styles.constructorElement} text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement className={styles.constructorElement} text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={sauce.name} price={sauce.price} thumbnail={sauce.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
						</li>
						<li>
						   <DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
						</li>
						<li>
							<DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
						</li>
						<li>
							<DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
						</li>
						<li>
							<DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
						</li>
					</ul>
				</div>

				{/* булка-bottom*/}
				<div className={`mr-10`}>
				   <ConstructorElement text={bun.name} price={bun.price} thumbnail={bun.image_mobile} type="bottom" isLocked={true} />
				</div>
			</div>

			{/* сумма заказа */}
			<div className={`${styles.orderPrice} mr-4 mt-10 mb-10`}>
				<div className={`text_type_digits-medium`}>
				   <span>5000</span>
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
