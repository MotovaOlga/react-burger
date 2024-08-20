import React from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../../utils/types'
import { Counter, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css'
import { useDrag } from "react-dnd";

const IngredientCard = ({ ingredient, getIngredientCount }) => {
	// DND
	// Хук useDrag позволяет добавлять элементам функциональность перетаскивания
	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: 'ingredientCard', // строка, благодаря которой целевой элемент понимает, какие элементы в него можно перетащить
		item: ingredient, //Это данные перетаскиваемого элемента. Почти всегда можно использовать только id конкретного элемента.
		// end: (item, monitor) => {
		// 	const dropResult = monitor.getDropResult()
		// 	if (item && dropResult) {
		// 	  alert(`You dropped ${item.name} into ${dropResult.name}!`)
		// 	}
		// },

		// collect используется для того, чтобы получать информацию о состоянии перетаскивания и идентификаторе обработчика
		collect: (monitor) => ({ //набор вычислений для работы с пропсами
		  isDragging: monitor.isDragging(),
		  handlerId: monitor.getHandlerId(),
		}),
	}));

	return (
		<div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<div style={{ display: getIngredientCount(ingredient) ? 'block' : 'none', }} className={`${styles.counterWrapper} p-4`} >
			   <Counter count={getIngredientCount(ingredient) || 0} size="dedault"/>
			</div>
			
			<img src={ingredient?.image || 'Unknown'} alt={ingredient?.name}/>
			<div className={`${styles.price} p-1`}>
				<div>
					<span className={`text_type_digits-default`}>{ingredient?.price || 0}</span>
				</div>
				<div>
					<CurrencyIcon type="primary"/>
				</div>
			</div>
			<p>{ingredient?.name || 'Unknown'}</p>
		</div>
	);	
};

IngredientCard.propTypes = {
	ingredient: ingredientType.isRequired,
	getIngredientCount: PropTypes.func.isRequired
};

export default IngredientCard;
