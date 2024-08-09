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
	count: PropTypes.number
});

// export const IngredientsState =  PropTypes.shape({
// 	ingredients: PropTypes.ingredientType[],
// 	loading: PropTypes.boolean,
// 	error: PropTypes.string | null,
// });

// export const RootState = PropTypes.shape({
// });
