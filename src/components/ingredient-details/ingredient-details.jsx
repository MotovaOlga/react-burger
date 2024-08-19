import React from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../utils/types'
import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'

const IngredientDetails = () => {
	const ingredient = useSelector(state => state.ingredientDetails.currentIngredient);
	// console.log('ingredient: ', ingredient); // отладка

	return (
		<div className={`${styles.ingredientDetails}`}>
			<main>
				<img src={`${ingredient.image}`} alt={`${ingredient.name}`} />
				<p className={`text_type_main-medium pt-4 pb-8`}>{`${ingredient.name}`}</p>
				<ul>
					<li>
						<p>Калории,ккал</p>
						<p className={`text_type_digits-default`}>{`${ingredient.calories}`}</p>
					
					</li>
					<li>
						<p>Белки, г</p>
						<p className={`text_type_digits-default`}>{`${ingredient.proteins}`}</p>
					</li>
					<li>
						<p>Жиры, г</p>
						<p className={`text_type_digits-default`}>{`${ingredient.fat}`}</p>
					</li>
					<li>
						<p>Углеводы, г</p>
						<p className={`text_type_digits-default`}>{`${ingredient.carbohydrates}`}</p>
					</li>
				</ul>
			</main>
		</div>
	)
};

// IngredientDetails.propTypes = {
// 	ingredient: PropTypes.shape(ingredientType).isRequired,
// };

export default IngredientDetails;
