import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
	ActivityIndicator,
	StyleSheet,
	Keyboard,
	ScrollView,
} from 'react-native';

import { Block, Text, Input, Button } from '../components/utils';
import { theme } from '../constants';
import { useForm } from '../utils/hooks/useForm';
import isEmpty from '../utils/validations/is-empty';
import {
	selectErrors,
	selectLoading,
} from '../redux/account/account.selectors';
import { validateSignupData } from '../utils/validations/sign-up';
import { getErrors, registerUser } from '../redux/account/account.actions';

function SignUp(props) {
	const initialValues = {
		name: '',
		email: '',
		username: '',
		password: '',
		confirm_password: '',
	};

	const { values, errors, setErrors, onChangeText, handleSubmit } = useForm(
		submitForm,
		initialValues
	);

	const { name, email, username, confirm_password, password } = values;

	const { navigation, dataErrors, dispatch, loading } = props;

	function submitForm() {
		Keyboard.dismiss();

		const { isValid, errors } = validateSignupData(values);

		if (!isValid) dispatch(getErrors(errors));
		else {
			dispatch(registerUser(values, navigation));
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
		<ScrollView>
			<Block padding={[0, theme.sizes.padding * 2]}>
				<Text h1 bold>
					Sign up
				</Text>

				<Block middle>
					<Input
						label='Full name'
						error={errors.name}
						style={[styles.input, errors.name ? styles.hasErrors : null]}
						defaultValue={name}
						onChangeText={(text) => onChangeText('name', text)}
					/>

					<Input
						label='Username'
						error={errors.username}
						style={[styles.input, errors.username ? styles.hasErrors : null]}
						defaultValue={username}
						onChangeText={(text) => onChangeText('username', text)}
					/>

					<Input
						label='Email'
						error={errors.email}
						style={[styles.input, errors.email ? styles.hasErrors : null]}
						defaultValue={email}
						onChangeText={(text) => onChangeText('email', text)}
					/>

					<Input
						secure
						label='Password'
						error={errors.password}
						style={[styles.input, errors.password ? styles.hasErrors : null]}
						defaultValue={password}
						onChangeText={(text) => onChangeText('password', text)}
					/>

					<Input
						secure
						label='Confirm password'
						error={errors.confirm_password}
						style={[
							styles.input,
							errors.confirm_password ? styles.hasErrors : null,
						]}
						defaultValue={confirm_password}
						onChangeText={(text) => onChangeText('confirm_password', text)}
					/>

					<Button gradient onPress={handleSubmit}>
						{loading ? (
							<ActivityIndicator size='small' color='white' />
						) : (
							<Text bold white center>
								Sign up
							</Text>
						)}
					</Button>

					<Button onPress={() => navigation.navigate('Login')}>
						<Text gray caption center style={styles.forget}>
							Login
						</Text>
					</Button>
				</Block>
			</Block>
		</ScrollView>
	);
}

SignUp.navigationOptions = {
	headerBackTitle: null,
};

const styles = StyleSheet.create({
	signup: {
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

export default connect(mapStateToProps)(SignUp);
