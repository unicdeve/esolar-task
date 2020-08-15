import { createSelector } from 'reselect';

export const selectTodo = (state) => state.todo;

export const selectErrors = createSelector([selectTodo], (todo) => todo.errors);

export const selectLoading = createSelector(
	[selectTodo],
	(todo) => todo.loading
);

export const selectTodos = createSelector([selectTodo], (todo) => todo.todos);
