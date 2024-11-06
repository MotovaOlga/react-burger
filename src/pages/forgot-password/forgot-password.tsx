import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from './forgot-password.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { fetchForgotPassword } from "../../services/actions/auth";
import { IRootState, AppDispatch } from '../../utils/types';


export const ForgotPassword: FC = () => {
	const dispatch = useDispatch<AppDispatch>();	
	const navigate = useNavigate();
	// const emptyState: IFormData = { email: "", };
	const [email, setEmail] = useState<{email: string}>({ email: '' });
	const emailSubmitted = useSelector((state: IRootState) => state.auth.emailSubmitted);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEmail(prevState => ({
			...prevState,
			[name]: value // Обновление значения по имени поля
		}));
   };

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(email) {
			dispatch(fetchForgotPassword(email));
		}
   };

	// В случае успеха пользователь направляется на маршрут /reset-password
	useEffect(()=>{
		if (emailSubmitted) { // emailSubmitted = true
			navigate('/reset-password');
		}
	}, [emailSubmitted])


	return (
		<form onSubmit={handleSubmit} className={`${styles.wrapper} text text_type_main-default text_color_inactive`}>
			<h2 className={`text text_type_main-medium text_color_primary pb-6`}>Восстановление пароля</h2>
			<div className={`pb-6`}>
				<Input
				   value={email.email}
					onChange={handleInputChange}
					onPointerEnterCapture={undefined} 
				   onPointerLeaveCapture={undefined}
               // onChange={e => setEmail({email: e.target.value})}
               type={'text'}
               placeholder={'Укажите e-mail'}
               name={'email'}
               size={'default'}
            />
			</div>
			
			<Button
				type={'primary'}
				size={'large'}
				htmlType={'submit'}
				>
					Восстановить
				</Button>

			<span className={`${styles.additionalActions} pt-20`}>Вспомнили пароль?
				<Link to={'/login'} className="text_color_accent pl-2">Войти</Link>
			</span>
		</form>
	)
};