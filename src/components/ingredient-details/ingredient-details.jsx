import React, { useState, useEffect } from 'react';
import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { ingredientsRequest } from '../../services/actions/ingredients';


const IngredientDetails = () => {
	const {ingredients, globalLoading, globalError} = useSelector((state) => state.ingredients);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const ingredient = ingredients.find((item) => item._id === id);

	useEffect(() => {
		setIsLoading(globalLoading); // Синхронизируем isLoading с глобальным isLoading
	}, [globalLoading]);

	// прелоудер, можно еще создать отдельный компонент <Preloader />
	if(isLoading){
		return <p>Loading...</p>
	}

	if (globalError) {
		return <p>Error: {globalError.message || 'Something went wrong'}</p>; // Обработка глобальной ошибки, если есть
	}

	if (!id) {
		return <p>Error: No ID provided</p>
	};

	if (!ingredient) {
		return <p>Ingredient not found</p>; // Обработка случая, когда ингредиент не найден
	}

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
