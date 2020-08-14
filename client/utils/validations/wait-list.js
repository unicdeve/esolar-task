import isEmpty from './is-empty';

export const validateWaitList = (data) => {
	const { email } = data;

	const errors = {};

	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (email === '') errors.email = 'Email is required';
	else if (email.length < 8 || !re.test(email)) {
		errors.email = 'Please, enter a valid email address';
	}

	return { errors, isValid: isEmpty(errors) };
};
