import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../constants';
import { Block, Text, Button, Switch } from '../components/utils';
import TodoModalForm from '../components/todo-modal-form/TodoModalForm';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTodos } from '../redux/todo/todo.selectors';
import { getTodos } from '../redux/todo/todo.actions';
import isEmpty from '../utils/validations/is-empty';
import RenderTodos from '../components/render-todos/RenderTodos';

function Home({ dispatch, todos }) {
	const [open, setOpen] = useState(false);

	useBackHandler(() => {
		// if (shouldBeHandledHere) {
		// 	return true;
		// }
		// remove default behaviour
		return true;
	});

	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	return (
		<Block>
			<TodoModalForm modalVisible={open} closeModal={() => setOpen(false)} />

			<Text gray center h2 bold style={styles.header}>
				Your ToDo
			</Text>

			<Block flex={1}>
				<Block flex={0.85} middle padding={[0, theme.sizes.padding * 0.2]}>
					<RenderTodos todos={todos} />
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

const mapStateToProps = createStructuredSelector({
	todos: selectTodos,
});

export default connect(mapStateToProps)(Home);
