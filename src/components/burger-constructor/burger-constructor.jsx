import React from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'
// import data  from '../../utils/data.js';

const BurgerConstructor = ({ ingredients }) => {
	const bun = ingredients.filter((product) => product.type === 'bun')[0];
	const main1 = ingredients.filter((product) => product.type === 'main')[0];
	const main2 = ingredients.filter((product) => product.type === 'main')[1];
	const sauce = ingredients.filter((product) => product.type === 'sauce')[0];

	return(
		// <h1>BurgerConstructor</h1>
		<>
		<div className={`${styles.burgerConstructor} pt-10 custom-scroll`}>
			<div className={styles.burgerConstructor}>
				<div className={styles.constructorBox}>
					{console.log(main1?.name)}
					{/* булка-top*/}
					<ConstructorElement text={bun.name} price={bun.price} thumbnail={bun.image_mobile} type="top" isLocked={true} />

					{/* середина бургера */}
					<div>
						<ul>
							<DragIcon className={styles.dragIcon}/>
							<ConstructorElement className={styles.constructorElement} text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
							<DragIcon className={styles.dragIcon}/>
							<ConstructorElement className={styles.constructorElement} text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={sauce.name} price={sauce.price} thumbnail={sauce.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main1.name} price={main1.price} thumbnail={main1.image_mobile} isLocked={false} />
							<DragIcon/>
							<ConstructorElement text={main2.name} price={main2.price} thumbnail={main2.image_mobile} isLocked={false} />
						</ul>
					</div>

					{/* булка-bottom*/}
					<ConstructorElement text={bun.name} price={bun.price} thumbnail={bun.image_mobile} type="bottom" isLocked={true} />
				</div>
				<div className={styles.info}>
					{/* сумма заказа */}
					<span>5000</span>
					<CurrencyIcon type="primary"/>
					{/* кнопка */}
					<Button type="primary" size="medium" >Оформить заказ</Button> 
					{/* onClick={handleClick} */}
				</div>
			</div>
		</div>
		</>
	)
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired
};
