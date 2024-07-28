import React from 'react';
import { CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
// import data  from '../../utils/data.js';
import styles from './ingredient-list.module.css'

const IngredientList = ({ ingredients, title, onOpen }) => {
	return (
		<article>
			<p className={styles.header}>{title}</p>
			<ul className={styles.ingredientsList}>
				{ingredients.map(product => (
					<li key={product._id} className={styles.ingredientCard} onClick={()=>onOpen(product._id)}>
						<img src={product.image} alt={product.name} />
						<div>
							<span className={styles.price}>{product.price}</span>
							<CurrencyIcon type="primary"/>
						</div>
						
						<p>{product.name}</p>					
					</li>
				))}
			</ul>
		</article>
	);	
};

export default IngredientList;
