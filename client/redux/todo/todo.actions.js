import axios from 'axios';
import todoActionTypes from './todo.types';

export const getErrors = (errors) => ({
	type: todoActionTypes.set_errors,
	payload: errors,
});

export const getLoading = (load) => ({
	type: todoActionTypes.loading,
	payload: load,
});

export const getTodos = () => (dispatch) => {
	dispatch(getLoading(true));
	axios
		.get('/todo/')
		.then((res) => {
			dispatch({
				type: todoActionTypes.set_todos,
				payload: res.data,
			});
			dispatch(getLoading(false));
			dispatch(getErrors({}));
		})
		.catch((err) => {
			dispatch(getLoading(false));
			console.log(err);
			err.response && dispatch(getErrors(err.response.data));
		});
};

export const addTodo = (data, cb) => (dispatch) => {
	dispatch(getLoading(true));
	axios
		.post('/todo/', data)
		.then((res) => {
			dispatch({
				type: todoActionTypes.add_todo,
				payload: res.data,
			});
			dispatch(getLoading(false));
			dispatch(getErrors({}));
			cb();
		})
		.catch((err) => {
			dispatch(getLoading(false));
			console.log(err);
			err.response && dispatch(getErrors(err.response.data));
		});
};

export const deleteTodo = (todoId) => (dispatch) => {
	dispatch(getLoading(true));

	axios
		.delete(`/todo/${todoId}/`)
		.then((res) => {
			dispatch({
				type: todoActionTypes.delete_todo,
				payload: {
					todoId,
				},
			});
			dispatch(getLoading(false));
			dispatch(getErrors({}));
		})
		.catch((err) => {
			dispatch(getLoading(false));
			console.log(err);
			err.response && dispatch(getErrors(err.response.data));
		});
};

export const toggleComplete = (todo) => (dispatch) => {
	dispatch(getLoading(true));

	axios
		.patch(`/todo/${todo.id}/`, { completed: !todo.completed })
		.then((res) => {
			// dispatch({
			// 	type: todoActionTypes.mark_complete,
			// 	payload: {
			// 		todoId: res.data.id,
			// 		data: res.data,
			// 	},
			// });
			dispatch(getTodos());
			dispatch(getLoading(false));
			dispatch(getErrors({}));
		})
		.catch((err) => {
			dispatch(getLoading(false));
			console.log(err);
			err.response && dispatch(getErrors(err.response.data));
		});
};

export const editTodo = (data, cb) => (dispatch) => {
	dispatch(getLoading(true));

	axios
		.patch(`/todo/${data.id}/`, data)
		.then((res) => {
			dispatch(getTodos());
			dispatch(getLoading(false));
			dispatch(getErrors({}));
			cb();
		})
		.catch((err) => {
			dispatch(getLoading(false));
			console.log(err);
			err.response && dispatch(getErrors(err.response.data));
		});
};

export const setTodo = (todo) => ({
	type: todoActionTypes.set_todo,
	payload: todo,
});
