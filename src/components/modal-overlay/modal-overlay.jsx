import React from 'react';
import styles from './modal-overlay.module.css'


const ModalOverlay = ({onClose}) => {
	return(
		<div className={styles.modalOverlay} onClick={onClose}/>
	)
};

export default ModalOverlay;