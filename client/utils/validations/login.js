import isEmpty from './is-empty';

export const validateSignInData = (data) => {
	const { username, password } = data;

	const errors = {};

	if (!username) errors.username = 'Username is required';
	if (!password) errors.password = 'Password is required';

	return { errors, isValid: isEmpty(errors) };
};
