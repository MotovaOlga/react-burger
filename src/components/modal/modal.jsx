import React, { useEffect}  from 'react';
import {createPortal} from 'react-dom';
import styles from './modal.module.css'
import close from '../../images/close.svg'
import ModalOverlay from '../modal-overlay/modal-overlay'


const Modal = ({title, children, onClose}) => {
	const portal = document.getElementById('portal');

	const handleKeyDown = (event) => {
		if (event.key === 'Escape') {
		  onClose();
		}
	 };

	 useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
		  window.removeEventListener('keydown', handleKeyDown);
		};
	 }, [onClose]); 
  
	return createPortal(
		(
			<>
				<ModalOverlay onClose={onClose}/>
				{/* <div className={`${styles.modal} ${modalHeightClass} pl-10 pt-10 pr-10 pb-15`}> */}
				<div className={`${styles.modal} pl-10 pt-10 pr-10 pb-15`}>
					<header className={`text_type_main-large p-1`}>
						<div className={`${styles.title}`}>
							{title}
						</div>
						<div className={`${styles.img}`}>
							<img 
					      src={close} 
					      alt="Закрыть" 
					      onClick={onClose}
					   />
						</div>
					</header>
					{children}
				</div>
			</>
		), portal
	)
};

export default Modal;
