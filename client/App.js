import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, Asset } from 'expo';

import Navigation from './navigation';

import { Block } from './components/utils';

// import all used images
const images = [require('./assets/icons/back.png')];

export default function App(props) {
	const [isLoading, setIsLoading] = useState(false);

	handleResourceAsync = async () => {
		const cacheImages = images.map((img) => {
			return Asset.fromModule(img).downloadAsync();
		});

		return Promise.all(cacheImages);
	};

	if (isLoading && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={this.handleResourceAsync}
				onError={(err) => console.warn(err)}
				onFinish={() => setIsLoading(true)}
			/>
		);
	}

	return (
		<Block white>
			<Navigation />
		</Block>
	);
}

const styles = StyleSheet.create({});