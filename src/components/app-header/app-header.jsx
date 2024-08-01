import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

const AppHeader = () => {
	return(
		<nav>
			<div className={styles.appHeader}>
				
				<div className={styles.navBox}>
					{/* конструктор */}
					<div className={`${styles.icons} pr-5 pl-5 pt-4 pb-4`}>
					  <BurgerIcon type="secondary"/>
				     <span>Конструктор</span>
					</div>			

               {/* заказы */}
					<div className={`${styles.icons} pr-5 pl-5 pt-4 pb-4`}>
					  <ListIcon type="secondary"/>
                 <span>Лента заказов</span>
					</div>
				</div>
				
            {/* лого */}
				<div className={styles.navBox}>					
					<Logo/>
				</div>

            {/* корзина */}
				<div className={`${styles.icons} pr-5 pl-5 pt-4 pb-4`}>
				  <ProfileIcon type="secondary"/>
              <span>Личный кабинет</span>
				</div>		   

			</div>	
		</nav>
	)
}

export default AppHeader;