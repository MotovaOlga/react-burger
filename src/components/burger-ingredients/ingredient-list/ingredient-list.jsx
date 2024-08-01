import React from 'react';
import { CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
// import data  from '../../utils/data.js';
import styles from './ingredient-list.module.css'

const IngredientList = ({ ingredients, title, onOpen }) => {
	return (
		<article>
			<p className={`text_type_main-medium mt-10 mb-6`}>{title}</p>
			<ul className={styles.ingredientsList}>
				{ingredients.map(product => (
					<li key={product._id} className={styles.ingredientCard} onClick={()=>onOpen(product._id)}>
						<img src={product.image} alt={product.name} />
						<div className={`${styles.price} p-1`}>
							<div>
							   <span className={`text_type_digits-default`}>{product.price}</span>
							</div>
							<div>
							   <CurrencyIcon type="primary"/>
							</div>
						</div>
						<p>{product.name}</p>					
					</li>
				))}
			</ul>
		</article>

	);	
};

export default IngredientList;
