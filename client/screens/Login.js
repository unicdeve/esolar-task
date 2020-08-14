import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
	ActivityIndicator,
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
} from 'react-native';

import { Block, Text, Input, Button } from '../components/utils';
import { theme } from '../constants';
import { useForm } from '../utils/hooks/useForm';
import isEmpty from '../utils/validations/is-empty';
import {
	selectErrors,
	selectLoading,
} from '../redux/account/account.selectors';
import { validateSignInData } from '../utils/validations/login';
import { getErrors, loginUser } from '../redux/account/account.actions';

function Login(props) {
	const initialValues = {
		username: '',
		password: '',
	};

	const { values, errors, setErrors, onChangeText, handleSubmit } = useForm(
		handleLogin,
		initialValues
	);

	const { username, password } = values;

	const { navigation, dataErrors, dispatch, loading } = props;

	function handleLogin() {
		Keyboard.dismiss();

		const { isValid, errors } = validateSignInData(values);

		if (!isValid) dispatch(getErrors(errors));
		else {
			dispatch(loginUser(values, navigation));
		}
	}

	useEffect(() => {
		if (!isEmpty(dataErrors)) {
			console.log(dataErrors);
			setErrors(dataErrors);
		}

		return () => {
			setErrors({});
		};
	}, [dataErrors, setErrors]);

	return (
		<KeyboardAvoidingView style={styles.login} behavior='height'>
			<Block padding={[0, theme.sizes.padding * 2]}>
				<Text h1 bold>
					Login
				</Text>

				<Block middle>
					<Input
						label='Email or username'
						error={errors.username}
						style={[styles.input, errors.username ? styles.hasErrors : null]}
						defaultValue={username}
						onChangeText={(text) => onChangeText('username', text)}
					/>

					<Input
						secure
						label='Password'
						error={errors.password}
						style={[styles.input, errors.password ? styles.hasErrors : null]}
						defaultValue={password}
						onChangeText={(text) => onChangeText('password', text)}
					/>

					<Button gradient onPress={handleSubmit}>
						{loading ? (
							<ActivityIndicator size='small' color='white' />
						) : (
							<Text bold white center>
								Login
							</Text>
						)}
					</Button>

					<Button onPress={() => navigation.navigate('SignUp')}>
						<Text gray caption center style={styles.forget}>
							Sign up
						</Text>
					</Button>
				</Block>
			</Block>
		</KeyboardAvoidingView>
	);
}

Login.navigationOptions = {
	headerBackTitle: null,
};

const styles = StyleSheet.create({
	login: {
		flex: 1,
		justifyContent: 'center',
	},
	input: {
		borderRadius: 0,
		borderWidth: 0,
		borderBottomColor: theme.colors.gray2,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	forget: {
		textDecorationLine: 'underline',
	},
	hasErrors: {
		borderBottomColor: theme.colors.accent,
	},
});

const mapStateToProps = createStructuredSelector({
	dataErrors: selectErrors,
	loading: selectLoading,
});

export default connect(mapStateToProps)(Login);
