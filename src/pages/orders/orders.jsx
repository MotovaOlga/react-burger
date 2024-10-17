import React from 'react'
import styles from './orders.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { fetchLogout} from "../../services/actions/auth";


export const Orders = () => {
	const dispatch = useDispatch();
	let location = useLocation();

	// Выход 
	const handleLogout = async (e) => {
		e.preventDefault();
		dispatch(fetchLogout());
	};


	return (
		<div className={`${styles.wrapper} text_color_inactive`}>
			<div className={`${styles.mainBox}`}>
				{/* левый столбец */}
			   <div className={`${styles.links} text text_type_main-medium pr-15`}>
			   	<ul>
			   		{/* <li><span className={`text_color_primary`}>Профиль</span></li> */}
			   		<li>
							<NavLink 
							to={'/profile'} 
							className={
								location.pathname === "/profile"
								? 'text_color_primary'
								:'text-inactive-color'
							}
							>
								Профиль
							</NavLink></li>
			   		<li>
							<NavLink 
							to={'/profile/orders'} 
							className={
								location.pathname === "/profile/orders"
								? 'text_color_primary'
								:'text-inactive-color'
							}
							>
								История заказов
							</NavLink></li>
						<li><button onClick={handleLogout} className={`${styles.buttonLogout} text_type_main-medium text-inactive-color`}>Выход</button></li>
			   	</ul>
			   </div>

				{/* правый  столбец */}
			   <div className={`${styles.inputs}`}>
					<h2>История заказов</h2>
					<p>...</p>
			   </div>
			</div>
		</div>
	)
};
