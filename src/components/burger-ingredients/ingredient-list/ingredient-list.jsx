import React from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../../utils/types'
// import data  from '../../utils/data.js';
import styles from './ingredient-list.module.css'
import IngredientCard from '../ingredient-card/ingredient-card';

const IngredientList = ({ headerId, headerRef, ingredients, title, onOpen, getIngredientCount }) => {
	return (
		<article>
			<p id={headerId} ref={headerRef} className={`text_type_main-medium mt-10 mb-6`} >{title}</p>
			<ul className={styles.ingredientsList}>
				{ingredients.map(product => (
					<li key={product?._id || 'Unknown'} className={styles.ingredientCard} onClick={() => onOpen(product?._id || 'Unknown')}>
						<IngredientCard ingredient={product} getIngredientCount={getIngredientCount}></IngredientCard>
					</li>
				))}
			</ul>
		</article>
	);	
};

IngredientList.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType),
	getIngredientCount: PropTypes.func.isRequired
};

export default IngredientList;
