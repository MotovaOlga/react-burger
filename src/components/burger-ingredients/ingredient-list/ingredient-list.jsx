import React from 'react';
import { Counter, CurrencyIcon }  from '@ya.praktikum/react-developer-burger-ui-components';
// import data  from '../../utils/data.js';
import styles from './ingredient-list.module.css'
// import { DropTargetMonitor, useDrop, useDrag } from "react-dnd";

const IngredientList = ({ headerId, headerRef, ingredients, title, onOpen, addIngOnDblclick, getIngredientCount }) => {
	// DND
	// Хук useDrag позволяет добавлять элементам функциональность перетаскивания
	// const handleDrag = ({ id, index, children }) => {
	// 	const [{ isDragging }, dragRef] = useDrag(() => ({
	// 		type: 'ingredient', // строка, благодаря которой целевой элемент понимает, какие элементы в него можно перетащить
	// 		item: { id, index }, //Это данные о перетаскиваемом элементе. Почти всегда можно использовать только id конкретного элемента.
	// 		// end: (item, monitor) => { //???
	// 		//   const dropResult = monitor.getDropResult()
	// 		//   if (item && dropResult) {
	// 		// 	 alert(`You dropped ${item.name} into ${dropResult.name}!`)
	// 		//   }
	// 		// },
	// 		collect: (monitor) => ({ //набор вычислений для работы с пропсами
	// 		  isDragging: monitor.isDragging(),
	// 		//   handlerId: monitor.getHandlerId(),
	// 		}),
	// 	}));
	// 	return (
	// 		<div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }} className={`${styles.card}`}>
	// 			 {children}
	// 		</div>
	//   );

	// };



	return (
		<article>
			<p id={headerId} ref={headerRef} className={`text_type_main-medium mt-10 mb-6`} >{title}</p>
			<ul className={styles.ingredientsList}>
				{ingredients.map(product => (
               // ref={dragRef} 
					<li key={product._id} className={styles.ingredientCard} onDoubleClick={()=> onOpen(product._id)} onClick={() => addIngOnDblclick(product)}>

						<Counter className={`${styles.counterStyle} p-4`} count={getIngredientCount(product)} size="dedault"/>
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
