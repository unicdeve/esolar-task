import React from 'react';
import { View, Text } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';

function Home() {
	useBackHandler(() => {
		// if (shouldBeHandledHere) {
		// 	return true;
		// }
		return true;
	});

	return (
		<View>
			<Text>Home</Text>
		</View>
	);
}

Home.navigationOptions = {
	headerBackTitle: null,
	headerBackImage: () => null,
	headerLeft: null,
	gesturesEnabled: false,
};

export default Home;
