import { FC, useState, useEffect } from 'react';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './home.module.css'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IRootState } from '../../utils/types';


export const Home: FC = () => {
	// И отрисовывать BurgerIngredients и BurgerConstructor только если запрос завершился и пришли ингредиенты
	const {ingredients, loading: globalLoading, error: globalError} = useSelector((state: IRootState) => state.ingredients);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(globalLoading); // Синхронизируем локальное состояние с глобальным
	}, [globalLoading]);

	return (
		<div className={`${styles.wrapper}`}>
		   {loading ? (
		   	<div>Loading...</div>
		   ) : globalError ? (
		   	<div>Error: {globalError.message}</div>
		   ) : (ingredients?.length > 0) ? (
		   	<DndProvider backend={HTML5Backend}>	
		   		<div className={`${styles.mainBox} pr-5 pl-5`}>
		   			<BurgerIngredients/>
		   			<BurgerConstructor/>	
		   		</div>
		   	</DndProvider>
		   ) : (<div>No ingredients</div>)
		   }
		</div>
	)
};
