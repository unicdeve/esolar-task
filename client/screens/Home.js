import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../constants';
import { Block, Text, Button } from '../components/utils';
import TodoModalForm from '../components/todo-modal-form/TodoModalForm';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RenderTodos from '../components/render-todos/RenderTodos';
import { setTodo } from '../redux/todo/todo.actions';

function Home({ dispatch }) {
	const [open, setOpen] = useState(false);

	useBackHandler(() => {
		// if (shouldBeHandledHere) {
		// 	return true;
		// }
		// remove default behaviour
		return true;
	});

	const selectTodo = (todo) => {
		dispatch(setTodo(todo));
		setOpen(true);
	};

	const closeModal = () => {
		dispatch(setTodo({}));
		setOpen(false);
	};

	return (
		<Block>
			<TodoModalForm modalVisible={open} closeModal={closeModal} />

			<Text gray center h2 bold style={styles.header}>
				Your ToDo
			</Text>

			<Block flex={1}>
				<Block flex={0.85} middle padding={[0, theme.sizes.padding * 0.2]}>
					<RenderTodos selectTodo={selectTodo} />
				</Block>

				<Block flex={0.15} row right>
					<Button
						gradient
						shadow
						style={styles.addBtn}
						onPress={() => setOpen(true)}
					>
						<Text white center>
							<Ionicons size={theme.sizes.font * 3} name='ios-add' />
						</Text>
					</Button>
				</Block>
			</Block>
		</Block>
	);
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 20,
		marginTop: 10,
	},

	addBtn: {
		height: 60,
		width: 60,
		borderRadius: 50,
		marginRight: 10,
	},
});

Home.navigationOptions = {
	headerShown: false,
	headerBackTitle: null,
	headerBackImage: () => null,
	headerLeft: () => null,
	gestureEnabled: false,
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Home);
