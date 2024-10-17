import React from 'react';
import PropTypes from "prop-types";
import styles from './modal-overlay.module.css'
import { TModalOverlayProps } from '../../utils/types';

// это подложка под модальное окно
const ModalOverlay: React.FC<TModalOverlayProps> = ({onClose}) => {
	return (
		<div className={styles.modalOverlay} onClick={onClose}/>
	)
};

ModalOverlay.propTypes = { 
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;