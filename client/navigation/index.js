import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

import { theme } from '../constants';

const screens = createStackNavigator(
	{
		Splash,
		Login,
		SignUp,
		Home,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				height: theme.sizes.base * 5,
				backgroundColor: theme.colors.white,
				borderBottomColor: 'transparent',
				elevation: 0,
			},
			headerBackImage: () => (
				<Image source={require('../assets/icons/back.png')} />
			),
			headerBackTitle: null,
			title: null,
			headerLeftContainerStyle: {
				alignItems: 'center',
				marginLeft: theme.sizes.base * 1.2,
				paddingRight: theme.sizes.base,
			},
			headerRightContainerStyle: {
				alignItems: 'center',
				paddingRight: theme.sizes.base,
			},
			cardStyle: { backgroundColor: 'white' },
		},
	}
);

export default createAppContainer(screens);
