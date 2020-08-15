import { useState } from 'react';

export const useForm = (submitCallback, initialState = {}) => {
	const [values, setValues] = useState(initialState);
	const [errors, setErrors] = useState({});

	const onChangeText = (name, value) => {
		setValues({ ...values, [name]: value });
		errors[name] && setErrors({ ...errors, [name]: '' });
	};

	const handleSubmit = () => {
		submitCallback();
	};

	return {
		onChangeText,
		handleSubmit,
		values,
		setValues,
		errors,
		setErrors,
	};
};
