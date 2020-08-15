import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';

import accountReducer from './account/account.reducer';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	account: accountReducer,
});

export default persistReducer(persistConfig, rootReducer);
