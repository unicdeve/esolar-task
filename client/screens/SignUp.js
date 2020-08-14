import React, { useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Keyboard,
	Alert,
	ScrollView,
} from 'react-native';

import { Block, Text, Input, Button } from '../components/utils';
import { theme } from '../constants';

export default function SignUp(props) {
	const [values, setValues] = useState({
		name: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		errors: {},
		loading: false,
	});

	const {
		name,
		email,
		username,
		confirmPassword,
		password,
		errors,
		loading,
	} = values;
	const { navigation } = props;

	const handleLogin = () => {
		setValues({ ...values, loading: true });
		Keyboard.dismiss();

		if (email === '') {
			errors.email = 'email is required';
			setValues({ ...values, loading: false });
		} else if (password === '') {
			errors.password = 'password is required';
			setValues({ ...values, loading: false });
		} else {
			setTimeout(() => {
				setValues({ ...values, loading: false });
				Alert.alert(
					'Success!',
					'Your account has been created.',
					[
						{
							text: 'Continue',
							onPress: () => navigation.navigate('Browse'),
						},
					],
					{ cancelable: false }
				);
			}, 2000);
		}
	};

	return (
		<ScrollView>
			<Block padding={[0, theme.sizes.padding * 2]}>
				<Text h1 bold>
					Sign up
				</Text>

				<Block middle>
					<Input
						label='Full name'
						error={errors.name ? true : false}
						style={[styles.input, errors.name ? styles.hasErrors : null]}
						defaultValue={name}
						onChangeText={(text) => setValues({ ...values, name: text })}
					/>

					<Input
						label='Username'
						error={errors.username ? true : false}
						style={[styles.input, errors.username ? styles.hasErrors : null]}
						defaultValue={username}
						onChangeText={(text) => setValues({ ...values, username: text })}
					/>

					<Input
						label='Email'
						error={errors.email ? true : false}
						style={[styles.input, errors.email ? styles.hasErrors : null]}
						defaultValue={email}
						onChangeText={(text) => setValues({ ...values, email: text })}
					/>

					<Input
						secure
						label='Password'
						error={errors.password ? true : false}
						style={[styles.input, errors.password ? styles.hasErrors : null]}
						defaultValue={password}
						onChangeText={(text) => setValues({ ...values, password: text })}
					/>

					<Input
						secure
						label='Confirm password'
						error={errors.confirmPassword ? true : false}
						style={[
							styles.input,
							errors.confirmPassword ? styles.hasErrors : null,
						]}
						defaultValue={confirmPassword}
						onChangeText={(text) =>
							setValues({ ...values, confirmPassword: text })
						}
					/>

					<Button gradient onPress={handleLogin}>
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
