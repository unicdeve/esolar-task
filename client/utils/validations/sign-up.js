import isEmpty from './is-empty';

export const validateSignupData = (data) => {
	const { name, email, username, password, confirm_password } = data;

	const errors = {};

	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (email === '') errors.email = 'Email is required';
	else if (email.length < 8 || !re.test(email)) {
		errors.email = 'Please, enter a valid email address';
	}

	if (!name) errors.name = 'Name is required';
	if (!username) errors.username = 'Username is required';
	if (!password) errors.password = 'Password is required';
	if (confirm_password !== password)
		errors.password = 'Both passwords must match';

	return { errors, isValid: isEmpty(errors) };
};
