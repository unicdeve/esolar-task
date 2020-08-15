import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Block, Text } from '../utils';
import isEmpty from '../../utils/validations/is-empty';

function RenderTodos({ todos }) {
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

export default RenderTodos;
