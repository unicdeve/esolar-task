import accountActionTypes from './account.types';
import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import setAuthToken from '../../utils/setAuthToken';

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
			dispatch(setUser(res.data));
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
			dispatch(setUser(res.data));
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

export const setUser = (payload) => {
	setAuthToken(payload.token);

	return {
		type: accountActionTypes.set_user,
		payload,
	};
};
