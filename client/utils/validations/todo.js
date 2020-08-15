import isEmpty from './is-empty';

export const validateTodo = (data) => {
	const { title } = data;

	const errors = {};

	if (!title) errors.title = 'Enter a title';

	return { errors, isValid: isEmpty(errors) };
};
