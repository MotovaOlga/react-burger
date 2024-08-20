import React, { useState, useEffect } from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ingredientsRequest } from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
	const dispatch = useDispatch();

	// И отрисовывать BurgerIngredients и BurgerConstructor только если запрос завершился и пришли ингредиенты
	const {ingredients, globalLoading, globalError} = useSelector((state) => state.ingredients);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(ingredientsRequest());
   }, []);

	useEffect(() => {
		setLoading(globalLoading); // Синхронизируем локальное состояние с глобальным
	}, [globalLoading]);

	return (
		<>
			<div className={`${styles.app} text_type_main-default`}>
			   <AppHeader />
				{loading ? (
					<div>Loading...</div>
				) : globalError ? (
					<div>Error: {globalError.message}</div>
				) : (ingredients?.length > 0) ? (
					<DndProvider backend={HTML5Backend}>	
				      <div className={styles.mainBox}>
				      	<BurgerIngredients/>
				         <BurgerConstructor/>	
				      </div>
				   </DndProvider>
				) : (<div>No ingredients</div>)
			   }
			</div>
	 </>
	);
}
 
export default App;


      

