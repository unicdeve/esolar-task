import todoActionTypes from './todo.types';

const initialState = {
	errors: {},
	loading: false,
	todos: [],
};

const todoReducer = (state = initialState, action) => {
	let todoIndex;
	if (action.payload) {
		todoIndex = state.todos.findIndex(
			(todo) => todo.id === action.payload.todoId
		);
	}

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

		case todoActionTypes.delete_todo:
			const todos = state.todos.filter(
				(todo) => todo.id !== action.payload.todoId
			);

			return {
				...state,
				todos,
			};

		default:
			return state;
	}
};

export default todoReducer;
