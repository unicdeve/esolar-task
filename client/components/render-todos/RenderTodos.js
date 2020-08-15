import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Block, Text, Switch } from '../utils';
import isEmpty from '../../utils/validations/is-empty';
import { theme } from '../../constants';
import { selectTodos } from '../../redux/todo/todo.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getTodos, deleteTodo } from '../../redux/todo/todo.actions';

function RenderTodos({ todos, dispatch }) {
	const handleDelete = (id) => {
		dispatch(deleteTodo(id));
	};

	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	const displayTodos = () =>
		!isEmpty(todos) ? (
			todos.map((todo, i) => (
				<Block key={i} style={styles.todo}>
					<Text
						title
						style={[todo.completed ? styles.completed : styles.uncompleted]}
					>
						{todo.title}
					</Text>
					<Block flex={false} row>
						<MaterialCommunityIcons
							name='delete-outline'
							size={theme.sizes.font * 1.5}
							color='gray'
							style={styles.deleteIcon}
							onPress={() => handleDelete(todo.id)}
						/>
						<Switch
							value={todo.completed}
							onValueChange={(value) => console.log(value)}
						/>
					</Block>
				</Block>
			))
		) : (
			<Block flex={1} center middle>
				<Text h3 bold center>
					No list yet
				</Text>
			</Block>
		);

	return (
		<Block flex={1}>
			<ScrollView>{displayTodos()}</ScrollView>
		</Block>
	);
}

const styles = StyleSheet.create({
	todo: {
		backgroundColor: '#e2f3f5',
		marginBottom: 3,
		paddingHorizontal: 5,
		paddingVertical: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	deleteIcon: {
		marginRight: 20,
	},

	completed: {
		textDecorationLine: 'line-through',
		color: '#facf5a',
		fontStyle: 'italic',
	},

	uncompleted: {
		color: '#1f4287',
	},
});

const mapStateToProps = createStructuredSelector({
	todos: selectTodos,
});

export default connect(mapStateToProps)(RenderTodos);
