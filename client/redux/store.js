import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const preloadedState = {};

const middlewares = [thunk];

let composeEnhances = compose;

composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	preloadedState,
	composeEnhances(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default store;
