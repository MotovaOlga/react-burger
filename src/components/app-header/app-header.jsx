import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

function AppHeader(){
	return(
		<nav>
			<div className={styles.appHeader}>
				<div className={styles.navBox}>
					{/* конструктор */}
					<div className={styles.icons}  >
					  <BurgerIcon type="secondary"/>
				     <span>Конструктор</span>
					</div>					

               {/* заказы */}
					<div className={styles.icons}  >
					  <ListIcon type="secondary"/>
                 <span>Лента заказов</span>
					</div>
					
				</div>
				
            {/* лого */}
				<div className={styles.navBox}>					
					<Logo/>
				</div>

            {/* корзина */}
				<div className={styles.icons}>
				  <ProfileIcon type="secondary"/>
              <span>Личный кабинет</span>
				</div>		   

			</div>	
		</nav>
	)
}

export default AppHeader;