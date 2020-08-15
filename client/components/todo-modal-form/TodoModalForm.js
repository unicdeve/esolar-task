import React, { useEffect } from 'react';
import {
	Alert,
	Modal,
	StyleSheet,
	Keyboard,
	ActivityIndicator,
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';

import { Text, Button, Block, Input } from '../utils';
import { theme } from '../../constants';
import { useForm } from '../../utils/hooks/useForm';
import {
	selectLoading,
	selectErrors,
	selectToDo,
} from '../../redux/todo/todo.selectors';
import isEmpty from '../../utils/validations/is-empty';
import { validateTodo } from '../../utils/validations/todo';
import { getErrors, addTodo, editTodo } from '../../redux/todo/todo.actions';

function TodoModalForm(props) {
	const { width, height } = useDimensions().window;

	const initialValues = {
		title: '',
	};

	const {
		values,
		setValues,
		errors,
		setErrors,
		onChangeText,
		handleSubmit,
	} = useForm(submitTodo, initialValues);

	const { title } = values;

	const {
		modalVisible,
		closeModal,
		dataErrors,
		dispatch,
		loading,
		todo,
	} = props;

	function submitTodo() {
		Keyboard.dismiss();

		const { isValid, errors } = validateTodo(values);

		if (!isValid) dispatch(getErrors(errors));
		else {
			dispatch(addTodo(values, onClose));
		}
	}

	function onClose() {
		closeModal();
		setValues(initialValues);
	}

	const editSelectedTodo = () => {
		!isEmpty(todo) && dispatch(editTodo(values, onClose));
	};

	useEffect(() => {
		if (!isEmpty(dataErrors)) {
			setErrors(dataErrors);
		}

		return () => {
			setErrors({});
		};
	}, [dataErrors, setErrors]);

	useEffect(() => {
		if (!isEmpty(todo)) {
			setValues(todo);
		}
	}, [todo, setValues]);

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={onClose}
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
						{!isEmpty(todo) ? 'Edit todo' : 'Add new todo'}
					</Text>

					<Block style={{ width: width - 100 }}>
						<Block>
							<Input
								label='Title'
								error={errors.title}
								style={[styles.input, errors.title ? styles.hasErrors : null]}
								defaultValue={title}
								onChangeText={(text) => onChangeText('title', text)}
							/>
						</Block>
						<Button
							style={styles.addBtn}
							onPress={!isEmpty(todo) ? editSelectedTodo : handleSubmit}
						>
							{loading ? (
								<ActivityIndicator size='small' color='white' />
							) : (
								<Text bold white center>
									{!isEmpty(todo) ? 'Edit' : 'Add'}
								</Text>
							)}
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

const mapStateToProps = createStructuredSelector({
	loading: selectLoading,
	dataErrors: selectErrors,
	todo: selectToDo,
});

export default connect(mapStateToProps)(TodoModalForm);
