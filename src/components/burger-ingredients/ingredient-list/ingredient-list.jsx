import React from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../../utils/types'
// import data  from '../../utils/data.js';
import styles from './ingredient-list.module.css'
import IngredientCard from '../ingredient-card/ingredient-card';
import { Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom'
// import { link } from 'fs';

const IngredientList = ({ headerId, headerRef, ingredients, title, onOpen, getIngredientCount }) => {
	let location = useLocation();

	return (
		<article>
			<p id={headerId} ref={headerRef} className={`text_type_main-medium mt-10 mb-6`} >{title}</p>
			<ul className={styles.ingredientsList}>
				{ingredients.map(product => (
					// тут должжен быть линк при клике на который мы выведем модалку
					<Link 
					   key={product?._id || 'Unknown'} 
					   to={`/img/${product._id}`}
					   state={{backgroundLocation: location}} 
						className={styles.ingredientCard}
						onClick={() => onOpen(product?._id || 'Unknown')}
					>
						<IngredientCard ingredient={product} getIngredientCount={getIngredientCount}></IngredientCard>
					</Link>
					// <li key={product?._id || 'Unknown'} className={styles.ingredientCard} onClick={() => onOpen(product?._id || 'Unknown')}>
					// 	<IngredientCard ingredient={product} getIngredientCount={getIngredientCount}></IngredientCard>
					// </li>
				))}
			</ul>
		</article>
	);	
};

IngredientList.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType).isRequired,
	getIngredientCount: PropTypes.func.isRequired,
	headerId: PropTypes.string.isRequired,
	headerRef: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired, 
	onOpen: PropTypes.func.isRequired,
};

export default IngredientList;
