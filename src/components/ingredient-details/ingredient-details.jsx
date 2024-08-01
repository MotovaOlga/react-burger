import React from 'react';
import styles from './ingredient-details.module.css'

const IngredientDetails = (props) => {
	return (
		<div className={`${styles.ingredientDetails}`}>
			<main>
				<img src={`${props.currentIngredient.image}`} alt={`${props.currentIngredient.name}`} />
				<p className={`text_type_main-medium pt-4 pb-8`}>{`${props.currentIngredient.name}`}</p>
				<ul>
					<li>
						<p>Калории,ккал</p>
						<p className={`text_type_digits-default`}>{`${props.currentIngredient.calories}`}</p>
					
					</li>
					<li>
						<p>Белки, г</p>
						<p className={`text_type_digits-default`}>{`${props.currentIngredient.proteins}`}</p>
					</li>
					<li>
						<p>Жиры, г</p>
						<p className={`text_type_digits-default`}>{`${props.currentIngredient.fat}`}</p>
					</li>
					<li>
						<p>Углеводы, г</p>
						<p className={`text_type_digits-default`}>{`${props.currentIngredient.carbohydrates}`}</p>
					</li>
				</ul>
			</main>
		</div>
	)
};

export default IngredientDetails;
