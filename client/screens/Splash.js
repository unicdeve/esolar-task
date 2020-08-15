import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { selectUser } from '../redux/account/account.selectors';
import { Block, Text } from '../components/utils';
import { theme } from '../constants';
import { createStructuredSelector } from 'reselect';
import setAuthToken from '../utils/setAuthToken';

function Splash({ navigation, user }) {
	useEffect(() => {
		if (user) {
			setAuthToken(user.token);
			navigation.navigate('Home');
		} else {
			navigation.navigate('Login');
		}
	}, []);

	return (
		<Block padding={[0, theme.sizes.padding * 2]} middle>
			<Text h1 bold center>
				Welcome to Todo App
			</Text>
		</Block>
	);
}

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(Splash);
