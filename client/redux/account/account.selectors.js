import { createSelector } from 'reselect';

export const selectAccount = (state) => state.account;

export const selectErrors = createSelector(
	[selectAccount],
	(account) => account.errors
);

export const selectLoading = createSelector(
	[selectAccount],
	(account) => account.loading
);

export const selectUser = createSelector(
	[selectAccount],
	(account) => account.user
);
