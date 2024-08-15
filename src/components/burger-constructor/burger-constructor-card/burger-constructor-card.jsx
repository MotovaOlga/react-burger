import React, { useRef } from 'react';
import PropTypes from "prop-types";
import {ingredientType} from '../../../utils/types'
import { useDispatch } from 'react-redux'
import { addIngredient, deleteIngredient, moveIngredient } from '../../../services/actions/burger-constructor'
import styles from './burger-constructor-card.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from "react-dnd";

export const BurgerConstructorCard = ({ ingredient, index, moveCard}) => {
	// console.log('BurgerConstructorCard - ingredient:', ingredient);
	// console.log('BurgerConstructorCard - index:', index);
	// console.log('BurgerConstructorCard - ingredient.key:', ingredient.key);

	const dispatch = useDispatch();	 
	const handleDeleteIngredient = (ingredientKey) => {   
		// console.log('Deleting ingredient with KEY:', ingredientKey);
		dispatch(deleteIngredient(ingredientKey));
	}

	const isBun = ingredient.type === 'bun';

	// сортировка
	const ref = useRef(null)
	
	const [{ handlerId }, drop] = useDrop({
	   accept: 'ingredient',
	   hover: (item, monitor) => {
		   if (!ref.current) return;
			if (isBun) return;
		   const dragIndex = item.index; // это индекс элемента, который перетаскивается.
		   const hoverIndex = index; // это индекс элемента, над которым в данный момент находится перетаскиваемый элемент

			// console.log('dragIndex:', dragIndex);
		   // console.log('hoverIndex:', hoverIndex);
		   console.log('item.id:', item.id);
		   console.log('item:', item);

		   // Don't replace items with themselves
		   if (dragIndex === hoverIndex) return;
		   // Determine rectangle on screen
		   const hoverBoundingRect = ref.current?.getBoundingClientRect()
		   // Get vertical middle
		   const hoverMiddleY =
		  	(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		   // Determine mouse position
		   const clientOffset = monitor.getClientOffset()
		   // Get pixels to the top
		   const hoverClientY = clientOffset.y - hoverBoundingRect.top
		   // Only perform the move when the mouse has crossed half of the items height
		   // When dragging downwards, only move when the cursor is below 50%
		   // When dragging upwards, only move when the cursor is above 50%
		   // Dragging downwards
		   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
		
		   // Dragging upwards
		   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
		
		   // Time to actually perform the action
		   if (moveCard) {
				// if(item.key){
					moveCard(dragIndex, hoverIndex);
				// }
			 }

		   // Note: we're mutating the monitor item here!
		   // Generally it's better to avoid mutations,
		   // but it's good here for the sake of performance
		   // to avoid expensive index searches.
		   item.index = hoverIndex;
	   },
		// drop: (dragIndex, hoverIndex) => (
		// 	console.log('dragIndex:', dragIndex),
		//    console.log('hoverIndex:', hoverIndex),
		//    moveCard(dragIndex, hoverIndex)
	   // ), // принимает данные перетаскиваемого компонента и monitor. срабатывает при «броске» перетаскиваемого элемента в целевой.
	   collect: (monitor) => ({
		   handlerId: monitor.getHandlerId(),
			didDrop: monitor.didDrop(),

      }),
	})

	
	const [{ isDragging }, drag] = useDrag({
	  type: 'ingredient',
	  item: { id: ingredient.key, index },

	  collect: (monitor) => ({
		 isDragging: monitor.isDragging(),
		 canDrag: monitor.canDrag(),
	  }),
	})
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	
   return (
      <div ref={ref} style={{ ...styles, opacity } } data-handler-id={handlerId}>
         <DragIcon />
         <ConstructorElement
           className={styles.constructorElement}
           text={ingredient.name || 'Выберите ' + (isBun ? 'булку' : 'начинку')}
           price={ingredient.price || 0}
           thumbnail={ingredient.image_mobile || ''}
           type={isBun ? 'top' : ''} // Передаем корректный тип
           isLocked={isBun}
           handleClose={!isBun ? (() => handleDeleteIngredient(ingredient.key)) : undefined}
			  moveCard={!isBun ? (() => moveCard(ingredient.key)) : undefined}
         />
      </div>
   );
};

BurgerConstructorCard.propTypes = {
	ingredient: PropTypes.arrayOf(ingredientType).isRequired
};