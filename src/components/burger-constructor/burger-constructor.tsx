import { FC, useState, useCallback, useMemo }from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'
// import data  from '../../utils/data.js';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient, moveIngredient } from '../../services/actions/burger-constructor'
import { useDrop, DropTargetMonitor } from "react-dnd";
import { orderRequest } from '../../services/actions/order-details';
import { v4 as uuidv4 } from 'uuid';
import { BurgerConstructorCard } from './burger-constructor-card/burger-constructor-card'
import { useNavigate, useLocation } from 'react-router-dom'
import { IRootState, AppDispatch, IIngredient } from '../../utils/types';


const BurgerConstructor: FC = () => {
	const dispatch = useDispatch<AppDispatch>();	
	const navigate = useNavigate();
	const isAuth = useSelector((state: IRootState) => state.auth.isAuth);

	// массив игредиентов BurgerConstructor
	const arrBurgerConstructorIngredients = useSelector((state: IRootState) => state.burgerConstructor);

	// модальное окно
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const onClose = () => {
		setIsModalOpen(false);
	};
	const onOpen = () => {
		if(!isAuth){
			alert('Пройдите авторизацию.');
			navigate('/login'); // Навигация на страницу входа
			return; // Прерываем выполнение функции
		};
		if (
			arrBurgerConstructorIngredients &&
			arrBurgerConstructorIngredients.bun &&
			arrBurgerConstructorIngredients.burgerConstructor 
		   ) {
			const {bun, burgerConstructor} = arrBurgerConstructorIngredients;
			const orderIngredients = {				
				ingredients: [
				  bun ? bun._id : null,  // ID из объекта bun, если он существует
				  ...burgerConstructor ? burgerConstructor.map(item => item._id) : [],  // ID из массива burgerConstructor, если он существует
				  bun ? bun._id : null,  // ID из объекта bun, если он существует
				].filter(id => id !== null)  // Удаляем все null значения из массива
			};

			// Проверка, что массив ингредиентов не пустой
		   if (orderIngredients.ingredients.length > 2) {
		   	dispatch(orderRequest(orderIngredients));
		   	setIsModalOpen(true);
		   } else {
		   	alert('Добавьте ингредиенты, чтобы создать заказ.');
		   } 
		}	else {
			alert('Добавьте ингредиенты, чтобы создать заказ.');
		}
	};

	// сумма заказа
	const orderAmount = useMemo(() => {
		const bunPrice = arrBurgerConstructorIngredients.bun ? (arrBurgerConstructorIngredients.bun.price) * 2 : 0;
		const burgerConstructorPrice = Array.isArray(arrBurgerConstructorIngredients.burgerConstructor) 
			 ? arrBurgerConstructorIngredients.burgerConstructor.reduce((total, item) => total + (item.price || 0), 0)
			 : 0;
		// const burgerConstructorPrice = 0; 
		return bunPrice + burgerConstructorPrice;
  }, [arrBurgerConstructorIngredients]);

	// DND
	// сортировка
	const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
		dispatch(moveIngredient(dragIndex, hoverIndex));
	}, [])
	

	// добавление ингредиентов
	const handleAddIngredient = (ingredient: IIngredient) => {
		// Создаем новый объект ингредиента с уникальным ключом
		const ingredientWithKey = {
			...ingredient,
			key: uuidv4(), // Добавляем уникальный ключ
		};
		dispatch(addIngredient(ingredientWithKey));
  }

	// перетаскивание
	// Хук useDrop работает с целевым элементом(компонент, в который мы перетаскиваем исходный элемент).
		const [{ canDrop, dragItem, isHover }, dropTargetRef] = useDrop<
		   IIngredient,
		   unknown,
		   { canDrop:boolean; dragItem:IIngredient; isHover:boolean }>(() => ({
		accept: 'ingredientCard', // строка, которая должна быть аналогична свойству type перетаскиваемого компонента.
		drop: (ingredient: IIngredient) => (
			handleAddIngredient(ingredient)
		), // принимает данные перетаскиваемого компонента и monitor. срабатывает при «броске» перетаскиваемого элемента в целевой.
		collect: (monitor: DropTargetMonitor) => ({ // набор вычислений для работы с пропсами
			canDrop: monitor.canDrop(), // возвращает булевое значение true в случае, если в этот момент никакой элемент не перетаскивается.
         dragItem: monitor.getItem(),
         isHover: monitor.isOver(),
		}),
	}));


	return(
		<div className={`${styles.burgerConstructor} ml-5 pt-25`}>

			{/* модальное окно */}
			{
				isModalOpen && 
				<Modal onClose={onClose} title={''}>
					<OrderDetails/>
				</Modal>
			}

			{/* constructor box */}
			<div ref={dropTargetRef} className={`${styles.constructorBox}`}>
            <ul>
						   {/* булка-top*/}
							{arrBurgerConstructorIngredients.bun ? (
                        <li key="top">
									<BurgerConstructorCard ingredient={arrBurgerConstructorIngredients.bun} type={'top'} /> 
									{/* moveCard={()=>{return;}} index={''} */}
								</li>
                     ) : (
								<li key={'top'} >
								   <ConstructorElement text={'Выберите булку'} type={"top"} isLocked={true} price={0} thumbnail=''/>
							   </li>
					      )}
							
                     {/* середина бургера */}
							{arrBurgerConstructorIngredients.burgerConstructor.length > 0 ? (
								arrBurgerConstructorIngredients.burgerConstructor.map((product, index) => {
									if(product){
									   return (
											<div key={product.key}>
											   <li>
									            <BurgerConstructorCard moveCard={moveCard} ingredient={product} index={index}/>
										      </li>
											</div>
									   );
					         	}})
							):(
								<li key={'filings'} >
								   <ConstructorElement text={'Выберите начинку'} isLocked={true} price={0} thumbnail=''/>
							   </li>
							)}
                     
                     {/* булка-bottom*/}
							{arrBurgerConstructorIngredients.bun ? (
								<li key="bottom">
									<BurgerConstructorCard ingredient={arrBurgerConstructorIngredients.bun} type={'bottom'}/>
                        </li>
                     ) : (
								<li key={'bottom'} >
								   <ConstructorElement text={'Выберите булку'} type={"bottom"} isLocked={true} price={0} thumbnail=''/>
							   </li>
					      )}
            </ul>
         </div>

			{/* сумма заказа */}
			<div className={`${styles.orderPrice} mr-4 mt-10 mb-10`}>
				<div className={`text_type_digits-medium`}>
				   <span>{orderAmount}</span>
				</div>
				<div>
				   <CurrencyIcon type="primary"/>
				</div>
				<div className={`ml-10`}>
				   <Button htmlType='button' type='primary' size="medium" onClick={onOpen}>Оформить заказ</Button> 
				</div>
			</div>

		</div>
	)
};

export default BurgerConstructor;