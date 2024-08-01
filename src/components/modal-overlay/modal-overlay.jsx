import React from 'react';
import styles from './modal-overlay.module.css'

// это подложка под модальное окно
const ModalOverlay = ({onClose}) => {
	return(
		<div className={styles.modalOverlay} onClick={onClose}/>
	)
};

export default ModalOverlay;