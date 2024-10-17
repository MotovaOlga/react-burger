import PropTypes from 'prop-types';

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
}

// state
export interface IRootState {
	ingredients: IIngredientsState;
	burgerConstructor: IBurgerConstructorState;
	orderDetails: IOrderDetailsState;
   ingredientDetails: IIngredientDetailsState;
}
export interface IIngredientsState {
	ingredients: IIngredient[];
	loading: boolean;
	error: null|unknown;
}
export interface IBurgerConstructorState {
	bun: IIngredient | null;
	burgerConstructor: IIngredient[];
}
export interface IOrderDetailsState {
	order: string|null;
	loading: boolean;
	error: null|unknown;
}
export interface IIngredientDetailsState {
	currentIngredient: IIngredient;
}



// export interface BurgerConstructorCardProps {
// 	ingredient: IIngredient; 
// 	index: number;
// 	moveCard?: (dragIndex: number, hoverIndex: number) => void;
// }
