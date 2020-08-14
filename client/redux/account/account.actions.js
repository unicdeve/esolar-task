import accountActionTypes from './account.types';
import axios from 'axios';
import { Alert } from 'react-native';

export const getErrors = (errors) => ({
	type: accountActionTypes.set_errors,
	payload: errors,
});

export const getLoading = (load) => ({
	type: accountActionTypes.loading,
	payload: load,
});

export const registerUser = (data, navigation) => (dispatch) => {
	dispatch(getLoading(true));
	axios
		.post('/account/register/', data)
		.then((res) => {
			console.log(res.data);
			setUser(res.data);
			dispatch(getLoading(false));
			dispatch(getErrors({}));
			Alert.alert(
				'Success!',
				'Your account have been created.',
				[
					{
						text: 'Continue',
						onPress: () => navigation.navigate('Home'),
					},
				],
				{ cancelable: false }
			);
		})
		.catch((err) => {
			dispatch(getLoading(false));
			console.log(err);
			err.response && dispatch(getErrors(err.response.data));
		});
};

export const loginUser = (data, navigation) => (dispatch) => {
	dispatch(getLoading(true));
	axios
		.post('/account/login/', data)
		.then((res) => {
			setUser(res.data);
			dispatch(getLoading(false));
			dispatch(getErrors({}));

			Alert.alert(
				'Success!',
				'Welcome back!',
				[
					{
						text: 'Continue',
						onPress: () => navigation.navigate('Home'),
					},
				],
				{ cancelable: false }
			);
		})
		.catch((err) => {
			dispatch(getLoading(false));
			console.log(err);
			err.response && dispatch(getErrors(err.response.data));
		});
};

const setUser = (payload) => (dispatch) => {
	dispatch({
		type: accountActionTypes.set_user,
		payload,
	});
};
