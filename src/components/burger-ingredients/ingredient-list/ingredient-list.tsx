import React from 'react';
// import data  from '../../utils/data.js';
import styles from './ingredient-list.module.css'
import IngredientCard from '../ingredient-card/ingredient-card';
import { Link, useLocation} from 'react-router-dom'
import { TIngredientListProps } from '../../../utils/types';


const IngredientList: React.FC<TIngredientListProps> = ({ headerId, headerRef, ingredients, title, onOpen, getIngredientCount }) => {
	let location = useLocation();

	return (
		<article>
			<p id={headerId} ref={headerRef} className={`text_type_main-medium mt-10 mb-6`} >{title}</p>
			<ul className={styles.ingredientsList}>
				{ingredients.map(product => (
					<Link 
					   key={product?._id || 'Unknown'} 
					   to={`/img/${product._id}`}
					   state={{backgroundLocation: location}} 
						className={styles.ingredientCard}
						onClick={() => onOpen(product?._id || 'Unknown')}
					>
						<IngredientCard ingredient={product} getIngredientCount={getIngredientCount}></IngredientCard>
					</Link>
				))}
			</ul>
		</article>
	);	
};

export default IngredientList;
