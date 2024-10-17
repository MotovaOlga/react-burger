import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import { store } from '../services/store';

export const ingredientType = PropTypes.shape({
	_id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number,
	image: PropTypes.string,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string,
	__v: PropTypes.number,
	productId: PropTypes.string,
	count: PropTypes.number,
});

export const ingredientTypeWithKey = PropTypes.shape({
	_id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number,
	image: PropTypes.string,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string,
	__v: PropTypes.number,
	productId: PropTypes.string,
	count: PropTypes.number,
	key: PropTypes.string,
});


// ******************************************************

export interface IIngredient {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	key?: string;
};


export type AppDispatch = typeof store.dispatch;

// *** state ***
export interface IRootState {
	ingredients: IIngredientsState;
	burgerConstructor: IBurgerConstructorState;
	orderDetails: IOrderDetailsState;
   ingredientDetails: IIngredientDetailsState;
	auth: IAuthState;
};
interface IError {
	message: string; // Добавьте другие свойства, если необходимо
 }
export interface IIngredientsState {
	ingredients: IIngredient[];
	loading: boolean;
	error: IError | null;
};
export interface IBurgerConstructorState {
	bun: IIngredient | null;
	burgerConstructor: IIngredient[];
};
export interface IOrder {
	success: boolean;
	name: string;
	order: {
	  number: number;
	};
}
export interface IOrderDetailsState {
	order: IOrder|null;
	loading: boolean;
	error: IError | null;
};
export interface IIngredientDetailsState {
	currentIngredient: IIngredient;
};
export interface IUser {
	name: string;
   email: string;
	password?: string;
}
export interface IAuthState {
	isLoading: boolean; 
   isAuth: boolean; 
   user: IUser;
	emailSubmitted?: boolean;
};

// *** Props ***
// export const BurgerConstructorCard = ({ ingredient, index, moveCard, type}) => {
export type TBurgerConstructorCardProps = {
	ingredient: IIngredient; 
	index?: number;
	moveCard?: (dragIndex: number, hoverIndex: number) => void;
	type?: 'top' | 'bottom';
};

// const Modal: FC<> = ({title, children, onClose}) => {
export type TModalProps = {
	title: string;
	children: ReactNode;
	onClose: () => void;
};

// const ModalOverlay: React.FC = ({onClose}) => {
export type TModalOverlayProps = {
	onClose: () => void;
};

// export const ProtectedRouteElement: React.FC = ({onlyAuth = false, component}) => { 
export type TProtectedRouteElementProps = {
	onlyAuth: boolean;
	component: any;
};

// const IngredientCard: React.FC = ({ ingredient, getIngredientCount }) => {
export type TIngredientCardProps = {
	ingredient: IIngredient;
	getIngredientCount: (ingredient: IIngredient) => number;
};

// const IngredientList: React.FC<> = ({ headerId, headerRef, ingredients, title, onOpen, getIngredientCount }) => {
export type TIngredientListProps = {
	headerId: string;
	headerRef: React.RefObject<HTMLHeadingElement>;
	ingredients: IIngredient[];
	title: string;
	onOpen: (id: string) => void;
	getIngredientCount: (ingredient: IIngredient) => number;
};