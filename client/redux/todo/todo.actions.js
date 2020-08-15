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
