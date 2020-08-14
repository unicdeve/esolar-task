import accountActionTypes from './account.types';

const initialState = {
	errors: {},
	loading: false,
	user: {},
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case accountActionTypes.set_errors:
			return {
				...state,
				errors: action.payload,
			};

		case accountActionTypes.loading:
			return {
				...state,
				loading: action.payload,
			};

		case accountActionTypes.set_user:
			return {
				...state,
				user: action.payload,
			};

		default:
			return state;
	}
};

export default accountReducer;
