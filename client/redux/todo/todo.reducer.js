import todoActionTypes from './todo.types';

const initialState = {
	errors: {},
	loading: false,
	todos: [],
};

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case todoActionTypes.set_errors:
			return {
				...state,
				errors: action.payload,
			};

		case todoActionTypes.loading:
			return {
				...state,
				loading: action.payload,
			};

		case todoActionTypes.set_todos:
			return {
				...state,
				todos: action.payload,
			};

		case todoActionTypes.add_todo:
			return {
				...state,
				todos: [...state.todos, action.payload],
			};

		default:
			return state;
	}
};

export default todoReducer;
