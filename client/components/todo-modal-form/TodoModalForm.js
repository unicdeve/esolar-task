import React from 'react';
import { Alert, Modal, StyleSheet } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';

import { Text, Button, Block, Input } from '../utils';
import { theme } from '../../constants';

function TodoModalForm({ modalVisible, closeModal, navigation, user }) {
	const { width, height } = useDimensions().window;

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				closeModal();
			}}
		>
			<Block style={[styles.centeredView]}>
				<Block
					flex={false}
					style={[
						styles.modalView,
						{ width: width - 40, height: height * 0.5 },
					]}
				>
					<Text h3 bold gray center style={styles.header}>
						Add new list
					</Text>

					<Block style={{ width: width - 100 }}>
						<Block>
							<Input
								label='Title'
								// error={errors.username}
								style={[
									styles.input,
									// errors.username ? styles.hasErrors : null,
								]}
								// defaultValue={username}
								// onChangeText={(text) => onChangeText('username', text)}
							/>
						</Block>
						<Button style={styles.addBtn} onPress={closeModal}>
							<Text style={styles.textStyle}>Add</Text>
						</Button>
					</Block>
				</Block>
			</Block>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},

	modalView: {
		margin: 40,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	header: {
		marginBottom: 15,
	},

	input: {
		borderRadius: 0,
		borderWidth: 0,
		borderBottomColor: theme.colors.gray2,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},

	addBtn: { padding: 10, backgroundColor: '#21e6c1' },
});

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(TodoModalForm);
