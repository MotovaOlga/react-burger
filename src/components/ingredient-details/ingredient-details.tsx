import React, { FC } from 'react';
// import PropTypes from "prop-types";
// import {ingredientType} from '../../utils/types'
import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'
import { IRootState } from '../../utils/types'


const IngredientDetails: FC = () => {
	const ingredient = useSelector((state: IRootState ) => state.ingredientDetails.currentIngredient);
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

export default IngredientDetails;
