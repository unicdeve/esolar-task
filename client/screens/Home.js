import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../constants';
import { Block, Text, Button, Switch } from '../components/utils';
import TodoModalForm from '../components/todo-modal-form/TodoModalForm';

const todos = [
	{
		title: 'First todo',
		completed: true,
	},

	{
		title: 'First todo',
		completed: true,
	},

	{
		title: 'First todo',
		completed: true,
	},

	{
		title: 'First todo',
		completed: false,
	},
	{
		title: 'First todo',
		completed: false,
	},
	{
		title: 'First todo',
		completed: false,
	},

	{
		title: 'First todo',
		completed: false,
	},
	{
		title: 'First todo',
		completed: false,
	},
	{
		title: 'First todo',
		completed: false,
	},
	{
		title: 'First todo',
		completed: false,
	},
	{
		title: 'First todo',
		completed: false,
	},
];

function Home() {
	const [open, setOpen] = useState(true);

	useBackHandler(() => {
		// if (shouldBeHandledHere) {
		// 	return true;
		// }
		// remove default behaviour
		return true;
	});

	const renderTodo = () =>
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
		));

	return (
		<Block>
			<TodoModalForm modalVisible={open} closeModal={() => setOpen(false)} />

			<Text gray center h2 bold style={styles.header}>
				Your ToDo
			</Text>

			<Block flex={1}>
				<Block flex={0.85} padding={[0, theme.sizes.padding * 0.2]}>
					<ScrollView>{renderTodo()}</ScrollView>
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
		textDecorationColor: theme.colors.accent,
		color: '#ff304f',
		fontStyle: 'italic',
	},

	uncompleted: {
		color: '#1f4287',
	},
});

Home.navigationOptions = {
	headerShown: false,
	headerBackTitle: null,
	headerBackImage: () => null,
	headerLeft: () => null,
	gestureEnabled: false,
};

export default Home;
