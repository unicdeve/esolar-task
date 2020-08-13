import React, { useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
} from 'react-native';

import { Block, Text, Input, Button } from '../components/utils';
import { theme } from '../constants';

export default function Login(props) {
	const [values, setValues] = useState({
		email: 'email@email.com',
		password: 'password',
		errors: {},
		loading: false,
	});

	const { email, password, errors, loading } = values;
	const { navigation } = props;

	const handleLogin = () => {
		setValues({ ...values, loading: true });
		Keyboard.dismiss();

		// login actions
	};

	return (
		<KeyboardAvoidingView style={styles.login} behavior='height'>
			<Block padding={[0, theme.sizes.padding * 2]}>
				<Text h1 bold>
					Login
				</Text>

				<Block middle>
					<Input
						label='Email or username'
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

					<Button gradient onPress={handleLogin}>
						{loading ? (
							<ActivityIndicator size='small' color='white' />
						) : (
							<Text bold white center>
								Login
							</Text>
						)}
					</Button>

					<Button onPress={() => navigation.navigate('Signup')}>
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
