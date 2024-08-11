import React from 'react';
import { CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
// import data  from '../../utils/data.js';
import styles from './ingredient-list.module.css'

const IngredientList = ({ headerId, headerRef, ingredients, title, onOpen, addIngOnDblclick }) => {
	// console.log('onOpen:', onOpen('60666c42cc7b410027a1a9b1'));
	return (
		<article>
			<p id={headerId} ref={headerRef} className={`text_type_main-medium mt-10 mb-6`} >{title}</p>
			<ul className={styles.ingredientsList}>
				{ingredients.map(product => (
					<li key={product._id} className={styles.ingredientCard} ondblClick={()=> onOpen(product._id)} onClick={() => addIngOnDblclick(product)}>
						<img src={product.image} alt={product.name}/>
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
