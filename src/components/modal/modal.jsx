import React, { useEffect }  from 'react';
import {createPortal} from 'react-dom';
import styles from './modal.module.css'
import close from '../../images/close.svg'
import ModalOverlay from '../modal-overlay/modal-overlay'


const Modal = ({children, onClose})=>{
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
				<div className={styles.modal}>
					<img src={close} alt="Закрыть" className={styles.buttonClose} onClick={onClose}/>
					{children}
				</div>
			</>
			
		), portal

	)
};

export default Modal;
