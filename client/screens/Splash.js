import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { selectUser } from '../redux/account/account.selectors';
import { Block, Text } from '../components/utils';
import { theme } from '../constants';
import { createStructuredSelector } from 'reselect';
import setAuthToken from '../utils/setAuthToken';
import isEmpty from '../utils/validations/is-empty';

function Splash({ navigation, user }) {
	useEffect(() => {
		if (!isEmpty(user)) {
			setAuthToken(user.token);
			navigation.navigate('Login');
		} else {
			navigation.navigate('Login');
		}
	}, []);

	return (
		<Block padding={[0, theme.sizes.padding * 2]} middle>
			<Text h1 bold gray center>
				Welcome to Todo App
			</Text>
		</Block>
	);
}

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(Splash);
