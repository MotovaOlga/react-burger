import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'
import { NavLink, useLocation } from 'react-router-dom'


<<<<<<< HEAD:src/components/app-header/app-header.tsx
const AppHeader: React.FC = () => {
=======
const AppHeader = () => {
	const { pathname } = useLocation();

>>>>>>> main:src/components/app-header/app-header.jsx
	return(
		<header>		
		   <nav>
		   	<div className={styles.appHeader}>
		   		
		   		<div className={styles.navBox}>
		   			{/* конструктор */}
		   			<div className={`${styles.icons} pr-5 pl-5 pt-4 pb-4`}>
						  <NavLink 
						      to="/"
						      className={({isActive}) => isActive ? 'text_color_primary' : ''}>
		   			      <BurgerIcon type={pathname === '/' ? "primary" : "secondary"}/>
								<span>Конструктор</span>
							   </NavLink>
		   			</div>			
   
                  {/* заказы */}
		   			<div className={`${styles.icons} pr-5 pl-5 pt-4 pb-4`}>
		   			  <ListIcon type="secondary"/>
                    <span>Лента заказов</span>
		   			</div>
		   		</div>
		   		
               {/* лого */}
		   		<div className={styles.navBox}>	
						<NavLink
							to="/"
							>
							<Logo/>
							</NavLink>				
		   		</div>
   
               {/* корзина */}
		   		<div className={`${styles.icons} pr-5 pl-5 pt-4 pb-4`}>
					  <NavLink 
						   to="/profile"
						   className={({isActive}) => isActive ? 'text_color_primary' : ''}>
							<ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"}/>
							<span>Личный кабинет</span>
							</NavLink>
		   		</div>		   
   
		   	</div>	
		   </nav>
		</header>
	)
}

export default AppHeader;